import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plane, Zap, Clock, CheckCircle2, Flame } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="Airplane flying over Winnipeg skyline at sunset"
            fill
            priority
            className="object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary/15 via-primary/10 to-transparent pointer-events-none" />
        <div className="container relative z-20 py-24 md:py-32 text-center">
          <div className="mx-auto max-w-3xl">
						<div className="mx-auto mb-6 w-64">
              <Image
                src="/logo.webp"
                alt="Cheap Flights Winnipeg logo"
                width={320}
                height={320}
                priority
                className="h-auto w-full"
              />
            </div>
            {/* Urgency banner */}
            <Link
              href="#pricing"
              className="group mx-auto mb-5 inline-flex max-w-full items-center gap-3 rounded-full border border-yellow-500/40 bg-yellow-400/20 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur transition-colors hover:bg-yellow-400/25 hover:border-yellow-500/60"
            >
              <Flame className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">Limited-time:</span>
              <span className="font-bold text-primary">$40/year</span>
              <span className="text-muted-foreground">for the first 100 subscribers</span>
            </Link>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
							Fly More, Spend Less
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Hand-picked flight deals from Winnipeg. Get instant alerts and save hours hunting.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button className="px-6" asChild>
                <Link href="https://cheapflights.lemonsqueezy.com/buy/0123b381-a10e-4ded-8db6-aa8e63bdd409" target="_blank" rel="noopener noreferrer">
                  Subscribe Monthly — $5
                </Link>
              </Button>
							<Button variant="secondary" className="px-6" asChild>
								<Link href="https://cheapflights.lemonsqueezy.com/buy/5eeba522-441d-43b5-b6aa-53d00217be48" target="_blank" rel="noopener noreferrer">
									Subscribe Yearly — $50
								</Link>
							</Button>
              {/* <Button variant="link" asChild>
                <Link href="/deals">See live deals</Link>
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Social proof / trust */}
      <section className="container py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <Zap className="mt-1 h-5 w-5 text-secondary" />
            <div>
              <p className="font-medium">Hand-picked deals</p>
              <p className="text-sm text-muted-foreground">Only the best value routes make the cut.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-1 h-5 w-5 text-secondary" />
            <div>
              <p className="font-medium">Instant alerts</p>
              <p className="text-sm text-muted-foreground">Deals move fast — we notify you right away.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-secondary" />
            <div>
              <p className="font-medium">Save time</p>
              <p className="text-sm text-muted-foreground">Skip searching — we do the work for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 bg-gray-50">
        <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple pricing</h2>
          <p className="mt-2 text-muted-foreground">Cancel anytime. No hidden fees.</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Monthly</CardTitle>
              <CardDescription>Best for trying it out</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">$5</p>
              <p className="text-sm text-muted-foreground">per month</p>
								<Button className="mt-6 w-full justify-stretch">
									<Link href="https://cheapflights.lemonsqueezy.com/buy/5eeba522-441d-43b5-b6aa-53d00217be48" target="_blank" rel="noopener noreferrer" className="w-full">
										Subscribe
									</Link>
								</Button>
            </CardContent>
          </Card>
          <Card className="relative border-blue-200">
            <div className="absolute right-4 top-4">
              <Badge variant="success">Best value</Badge>
            </div>
            <CardHeader>
              <CardTitle>Yearly</CardTitle>
              <CardDescription>Save more with annual billing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">$50</p>
              <p className="text-sm text-muted-foreground">per year</p>
							<Button className="mt-6 w-full justify-stretch">
								<Link href="https://cheapflights.lemonsqueezy.com/buy/5eeba522-441d-43b5-b6aa-53d00217be48" target="_blank" rel="noopener noreferrer" className="w-full">
									Subscribe
								</Link>
							</Button>
            </CardContent>
          </Card>
          <Card className="relative border-yellow-500/40 bg-yellow-400/10">
            <div className="absolute right-4 top-4">
              <Badge className="bg-yellow-400 text-yellow-900">First 100 only</Badge>
            </div>
            <CardHeader>
              <CardTitle>Yearly — Limited</CardTitle>
              <CardDescription>Special launch price for early supporters</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">$40</p>
              <p className="text-sm text-muted-foreground">per year</p>
								<Button className="mt-6 w-full justify-stretch">
									<Link href="https://cheapflights.lemonsqueezy.com/buy/3d4c4473-17f1-47e2-a9e0-c45b275f5803" target="_blank" rel="noopener noreferrer" className="w-full">
										Subscribe
									</Link>
								</Button>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center">FAQ</h2>
          <div className="mt-6 space-y-6">
            <div>
              <p className="font-medium">Why not just use Google Flights?</p>
              <p className="text-sm text-muted-foreground mt-1">
                We monitor and curate only exceptional value deals from Winnipeg so you don’t have to search for hours. We’ll point you straight to book.
              </p>
            </div>
            <div>
              <p className="font-medium">Can I cancel anytime?</p>
              <p className="text-sm text-muted-foreground mt-1">
                Yes. No contracts or hidden fees.
              </p>
            </div>
            <div>
              <p className="font-medium">Do deals sell out fast?</p>
              <p className="text-sm text-muted-foreground mt-1">
                Great fares can disappear quickly. That’s why we send instant alerts so you can book while prices last.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cheap Flights Winnipeg
        </div>
      </footer>
    </div>
  );
}