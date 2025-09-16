import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

// Simple bearer token check to protect the endpoint from public abuse
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const expected = process.env.N8N_API_SECRET;
  return Boolean(expected && token && token === expected);
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

  const {
    destination,
    price,
    departure_date,
    return_date,
    airline = null,
    link,
  } = payload ?? {};

  if (
    !destination ||
    typeof destination !== "string" ||
    typeof price !== "number" ||
    !link ||
    typeof link !== "string" ||
    !departure_date ||
    !return_date
  ) {
    return NextResponse.json({
      error:
        "Missing or invalid fields. Required: destination (string), price (number), departure_date (YYYY-MM-DD), return_date (YYYY-MM-DD), link (string)",
    }, { status: 422 });
  }

  const admin = getSupabaseAdmin();

  const { data, error } = await admin
    .from("deals")
    .insert([{ destination, price, departure_date, return_date, airline, link }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
