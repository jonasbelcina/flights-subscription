import Link from "next/link";
import { supabase, type Deal } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

async function getDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from("deals")
    .select("id, subject")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return (data as Deal[]) || [];
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
                  <CardTitle className="text-xl">
                    <Link href={`/deals/${deal.id}`} className="hover:underline">
                      {deal.subject}
                    </Link>
                  </CardTitle>
                  <CardDescription>Open to view available flights</CardDescription>
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


