import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const expected = process.env.N8N_API_SECRET;
  return Boolean(expected && token && token === expected);
}

function extractDestination(subject: string): string {
  // Example: "Your tracked route: Winnipeg to Toronto flights from CA$131"
  const match = subject.match(/to\s+(.+?)\s+flights/i);
  return match?.[1]?.trim() || subject?.trim() || "Unknown destination";
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: any[];
  try {
    payload = await request.json();
    console.log(payload);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Convert single object to array
  if (!Array.isArray(payload)) {
    payload = [payload];
    console.log(`Converted single object to array: ${payload}`);
  }
  if (payload.length === 0) {
    return NextResponse.json({ error: "Expected a non-empty array." }, { status: 422 });
  }

  const admin = getSupabaseAdmin();
  const created: Array<{ id: string; destination: string }> = [];
  const warnings: string[] = [];

  for (const group of payload) {
    const subject = group?.subject as string;
    const deals = Array.isArray(group?.deals) ? group.deals : [];

    if (!subject || deals.length === 0) {
      warnings.push("Skipped item with missing subject or empty deals[]");
      continue;
    }

    const destination = extractDestination(subject);
    // Aggregate a parent deal: take min price, union of airlines, first stops/duration, combined date range
    const minPrice = Math.min(...deals.map((d: any) => Number(d.price)).filter((n: number) => Number.isFinite(n)));
    const airlinesSet = new Set<string>();
    for (const d of deals) {
      if (Array.isArray(d.airlines)) d.airlines.forEach((a: string) => a && airlinesSet.add(a));
    }
    const parent = {
      // destination,
      // dateRange: deals[0]?.dateRange ?? "",
      // discount: Number(deals[0]?.discount ?? 0),
      // price: minPrice,
      // airlines: Array.from(airlinesSet),
      // stops: deals[0]?.stops ?? "",
      // duration: deals[0]?.duration ?? "",
      // link: deals[0]?.link ?? "",
      subject: subject,
    };

    const { data: dealRow, error: dealErr } = await admin
      .from("deals")
      .insert([parent])
      .select("id")
      .single();

    if (dealErr || !dealRow?.id) {
      warnings.push(`Failed to create parent deal for subject '${subject}': ${dealErr?.message ?? "unknown"}`);
      continue;
    }

    const rows = deals.map((d: any) => ({
      deal_id: dealRow.id,
      dateRange: String(d.dateRange || ""),
      airline: String((Array.isArray(d.airlines) ? d.airlines[0] : d.airline) || ""),
      stops: String(d.stops || ""),
      duration: String(d.duration || ""),
      price: Number(d.price || 0),
      link: String(d.link || ""),
    }));

    const { error: flightsErr } = await admin.from("deal_flights").insert(rows);
    if (flightsErr) {
      warnings.push(`Created deal ${dealRow.id} but failed to add flights: ${flightsErr.message}`);
    } else {
      created.push({ id: dealRow.id, destination });
    }
  }

  return NextResponse.json({ ok: true, created, warnings }, { status: 201 });
}

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}


