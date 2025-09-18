import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

// Simple bearer token check to protect the endpoint from public abuse
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const expected = process.env.N8N_API_SECRET;
  return Boolean(expected && token && token === expected);
}

function parseDiscountPercent(input: unknown): number {
  if (input == null) return 0;
  const s = String(input).trim();
  const pct = s.match(/^(\d+(?:\.\d+)?)%$/);
  if (pct) return Math.max(0, Number(pct[1]));
  const n = Number(s);
  if (Number.isFinite(n)) return Math.max(0, n);
  return 0;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { subject, flights, discount: groupDiscount } = payload ?? {};
  if (!subject || typeof subject !== "string") {
    return NextResponse.json({ error: "Missing/invalid field: subject (string)" }, { status: 422 });
  }

  const admin = getSupabaseAdmin();

  const { data, error } = await admin
    .from("deals")
    .insert([{ subject }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Optionally insert nested flights
  if (Array.isArray(flights) && flights.length && data?.id) {
    const rows = flights
      .filter(Boolean)
      .map((f: any) => {
        const price = Number(f.price || 0);
        const rawDiscount = f.discount ?? groupDiscount ?? 0;
        const discount = parseDiscountPercent(rawDiscount);
        return {
          deal_id: data.id,
          dateRange: String(f.dateRange || ""),
          airline: String((Array.isArray(f.airlines) ? f.airlines[0] : f.airline) || ""),
          stops: String(f.stops || ""),
          duration: String(f.duration || ""),
          price,
          discount,
          link: String(f.link || ""),
        };
      });
    if (rows.length) {
      try { console.log("deal_flights rows:", rows); } catch {}
      const { data: inserted, error: childErr } = await admin.from("deal_flights").insert(rows).select("id, discount");
      try { console.log("inserted deal_flights:", inserted); } catch {}
      if (childErr) {
        return NextResponse.json({ ok: true, deal: data, warning: `Inserted deal but failed to add flights: ${childErr.message}` }, { status: 201 });
      }
    }
  }

  return NextResponse.json({ ok: true, deal: data }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Use POST to create a deal." });
}

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}
