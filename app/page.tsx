import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plane, Zap, Clock, CheckCircle2 } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/15 via-primary/10 to-transparent pointer-events-none" />
        <div className="container relative py-24 md:py-32 text-center">
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Cheap Flights Winnipeg
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Hand-picked flight deals from Winnipeg. Get instant alerts and save hours hunting.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="px-6" disabled>
                      Subscribe Monthly — $5
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Coming soon</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" className="px-6" disabled>
                      Subscribe Yearly — $50
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Coming soon</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button variant="link" asChild>
                <Link href="/deals">See live deals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof / trust */}
      <section className="container py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <Zap className="mt-1 h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Hand-picked deals</p>
              <p className="text-sm text-muted-foreground">Only the best value routes make the cut.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-1 h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Instant alerts</p>
              <p className="text-sm text-muted-foreground">Deals move fast — we notify you right away.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Save time</p>
              <p className="text-sm text-muted-foreground">Skip searching — we do the work for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container py-12">
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="mt-6 w-full" disabled>Subscribe</Button>
                  </TooltipTrigger>
                  <TooltipContent>Coming soon</TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="mt-6 w-full" disabled>Subscribe</Button>
                  </TooltipTrigger>
                  <TooltipContent>Coming soon</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
          <Card className="relative border-emerald-200">
            <div className="absolute right-4 top-4">
              <Badge variant="success">First 100 only</Badge>
            </div>
            <CardHeader>
              <CardTitle>Yearly — Limited</CardTitle>
              <CardDescription>Special launch price for early supporters</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">$40</p>
              <p className="text-sm text-muted-foreground">per year</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="mt-6 w-full" disabled>Subscribe</Button>
                  </TooltipTrigger>
                  <TooltipContent>Coming soon</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
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