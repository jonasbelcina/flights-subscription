import Link from "next/link";
import { supabase, type Deal, type DealFlight } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

async function getDealAndFlights(id: string): Promise<{ deal: Deal | null; flights: DealFlight[] }> {
  const [dealRes, flightsRes] = await Promise.all([
    supabase.from("deals").select("id, subject").eq("id", id).single(),
    supabase.from("deal_flights").select("id, deal_id, dateRange, airline, stops, duration, price, discount, link").eq("deal_id", id).order("price", { ascending: true }).order("id", { ascending: true })
  ]);

  // Add error handling for debugging
  if (dealRes.error) {
    console.error("Deal query error:", dealRes.error);
  }
  if (flightsRes.error) {
    console.error("Flights query error:", flightsRes.error);
  }

  // Debug the results
  // console.log("Deal result:", dealRes);
  // console.log("Flights result:", flightsRes);
  // console.log("Flights data:", flightsRes.data);
  // console.log("Flights data length:", flightsRes.data?.length);

  return {
    deal: dealRes.data ?? null,
    flights: flightsRes.data ?? [], // This will handle null case properly
  };
}

export default async function DealPage({ params }: { params: { id: string } }) {
  const { deal, flights } = await getDealAndFlights(params.id);

  if (!deal) {
    return (
      <div className="container py-10">
        <p className="text-muted-foreground">Deal not found.</p>
        {/* <Button asChild variant="link" className="px-0">
          <Link href="/deals">Back to deals</Link>
        </Button> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="container py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{deal.subject}</h1>
            <p className="text-muted-foreground mt-1">Available options listed below</p>
          </div>
          {/* <Button asChild variant="link">
            <Link href="/deals">Back to deals</Link>
          </Button> */}
        </div>

        <div className="mt-6 grid gap-4">
          {flights.length === 0 ? (
            <div className="rounded-xl border bg-card p-6 text-muted-foreground">No individual flights listed for this deal yet.</div>
          ) : (
            flights.map((f) => (
              <Card key={f.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">{f.dateRange}</CardTitle>
                  <CardDescription>{f.airline} • {f.stops} • {f.duration}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold">${""}{f.price.toFixed(0)}</p>
                        {Number(f.discount ?? 0) > 0 ? (
                          <Badge variant="successSoft" className="uppercase tracking-wide">Save {Number(f.discount).toFixed(0)}%</Badge>
                        ) : null}
                      </div>
                      <p className="text-xs text-muted-foreground">CAD</p>
                    </div>
                    <Button asChild>
                      <Link href={f.link} target="_blank" rel="noopener noreferrer">View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}


