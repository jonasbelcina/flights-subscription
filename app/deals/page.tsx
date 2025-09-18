import Link from "next/link";
import { supabase, type Deal } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

type DealSummary = Deal & {
  maxDiscount?: number;
  minPrice?: number;
  minDiscountedPrice?: number;
};

async function getDeals(): Promise<DealSummary[]> {
  const { data, error } = await supabase
    .from("deals")
    .select("id, subject")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  const deals = (data as Deal[]) || [];
  if (deals.length === 0) return [];

  const ids = deals.map((d) => d.id);
  const flightsRes = await supabase
    .from("deal_flights")
    .select("deal_id, price, discount")
    .in("deal_id", ids);
  if (flightsRes.error) {
    console.error(flightsRes.error);
    return deals;
  }
  const byDeal: Record<string, { maxDiscount: number; minPrice: number; minDiscounted: number }> = {};
  for (const f of flightsRes.data as any[]) {
    const price = Number(f.price || 0);
    const discount = Number(f.discount || 0);
    const discounted = Math.max(0, price - discount);
    const agg = byDeal[f.deal_id] || { maxDiscount: 0, minPrice: Number.POSITIVE_INFINITY, minDiscounted: Number.POSITIVE_INFINITY };
    agg.maxDiscount = Math.max(agg.maxDiscount, discount);
    agg.minPrice = Math.min(agg.minPrice, price);
    agg.minDiscounted = Math.min(agg.minDiscounted, discounted);
    byDeal[f.deal_id] = agg;
  }
  return deals.map((d) => ({
    ...d,
    maxDiscount: byDeal[d.id]?.maxDiscount || 0,
    minPrice: Number.isFinite(byDeal[d.id]?.minPrice) ? byDeal[d.id]?.minPrice : undefined,
    minDiscountedPrice: Number.isFinite(byDeal[d.id]?.minDiscounted) ? byDeal[d.id]?.minDiscounted : undefined,
  }));
}

// no date formatting needed; dateRange is preformatted

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
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-xl">
                      <Link href={`/deals/${deal.id}`} className="hover:underline">
                        {deal.subject}
                      </Link>
                    </CardTitle>
                    {deal.maxDiscount && deal.maxDiscount > 0 ? (
                      <Badge variant="success">Save ${deal.maxDiscount.toFixed(0)}</Badge>
                    ) : null}
                  </div>
                  {deal.minDiscountedPrice ? (
                    <CardDescription>
                      From ${deal.minDiscountedPrice.toFixed(0)}
                      {deal.minPrice && deal.minPrice > deal.minDiscountedPrice ? (
                        <span className="ml-2 text-muted-foreground line-through">${deal.minPrice.toFixed(0)}</span>
                      ) : null}
                    </CardDescription>
                  ) : (
                    <CardDescription>Open to view available flights</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild>
                    <Link href={`/deals/${deal.id}`}>View details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}


