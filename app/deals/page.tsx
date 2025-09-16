import Link from "next/link";
import { supabase, type Deal } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

async function getDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from("deals")
    .select("id, destination, price, departure_date, return_date, airline, link")
    .order("price", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return (data as Deal[]) || [];
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function DealsPage() {
  const deals = await getDeals();

  return (
    <div className="min-h-screen flex flex-col">
      <section className="container py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Latest deals</h1>
            <p className="text-muted-foreground mt-1">From Winnipeg, sorted by lowest price.</p>
          </div>
          <Button asChild variant="link">
            <Link href="/">Back to home</Link>
          </Button>
        </div>

        {deals.length === 0 ? (
          <div className="mt-12 rounded-xl border bg-card p-10 text-center text-muted-foreground">
            No deals right now — check back soon.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <Card key={deal.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{deal.destination}</CardTitle>
                  <CardDescription>
                    {deal.airline ? `${deal.airline} • ` : ""}
                    {formatDate(deal.departure_date)} – {formatDate(deal.return_date)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">${""}{deal.price.toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">CAD roundtrip</p>
                    </div>
                    <Button asChild>
                      <Link href={deal.link} target="_blank" rel="noopener noreferrer">
                        Book now
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}


