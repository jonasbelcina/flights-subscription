import Link from "next/link";
import Image from "next/image";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="container py-12 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">✈️ Cheap Flights Services — Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: September 2025</p>

        <p className="mt-6 text-muted-foreground">
          Welcome to Cheap Flights Services (“we,” “our,” or “us”). These Terms of Service (“Terms”) govern your use of our
          website, email alerts, and related services (collectively, the “Service”). By subscribing or using our Service, you
          agree to these Terms. Please read them carefully.
        </p>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold">1. Service Overview</h2>
            <p className="mt-2 text-muted-foreground">
              Cheap Flights Services is an email notification service that alerts subscribers to discounted flight deals from
              their selected departure city. We do not sell flights directly; all bookings are completed through third-party
              providers (e.g., airlines, Google Flights, or travel agencies).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. Eligibility</h2>
            <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
              <li>You must be at least 18 years old to use our Service.</li>
              <li>You agree to provide accurate account and payment information.</li>
              <li>You are responsible for maintaining the confidentiality of your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Subscriptions and Payments</h2>
            <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
              <li>Subscriptions are billed either monthly or annually, depending on the plan you choose.</li>
              <li>Payments are processed securely through our third-party payment providers (e.g., PayPal, Xendit, or others).</li>
              <li>Your subscription will automatically renew unless canceled before the renewal date.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Refund Policy</h2>
            <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
              <li>Due to the nature of digital services, all payments are non-refundable once a billing cycle has started.</li>
              <li>If you cancel before the next billing date, you will not be charged for the following period.</li>
              <li>
                <span className="font-medium">Exceptions:</span> Refunds may be granted in cases of accidental duplicate charges or technical errors. Please contact
                support within 14 days of billing for review.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Privacy Policy</h2>
            <p className="mt-2 text-muted-foreground">We value your privacy. This section explains how we collect and use your information:</p>
            <h3 className="mt-3 font-medium">Information We Collect</h3>
            <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
              <li>Email address (required for subscription and alerts)</li>
              <li>Payment details (processed via third-party providers; we do not store card numbers)</li>
              <li>Usage data (e.g., email opens, clicks, site visits)</li>
            </ul>
            <h3 className="mt-4 font-medium">How We Use Your Information</h3>
            <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
              <li>To deliver flight deal notifications</li>
              <li>To process payments and manage subscriptions</li>
              <li>To improve our Service and customer experience</li>
              <li>To communicate important updates</li>
            </ul>
            <h3 className="mt-4 font-medium">Sharing of Data</h3>
            <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
              <li>We do not sell or rent your personal information to third parties.</li>
              <li>
                Data may be shared with service providers strictly for payment processing, email delivery, or analytics.
              </li>
            </ul>
            <h3 className="mt-4 font-medium">Your Rights</h3>
            <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
              <li>You may unsubscribe from emails at any time.</li>
              <li>
                You may request deletion of your personal data by contacting us at <span className="whitespace-nowrap">support@[yourdomain].com</span>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Third-Party Services</h2>
            <p className="mt-2 text-muted-foreground">
              Our Service may link to third-party websites (such as Google Flights or airline booking platforms). We are not
              responsible for the content, pricing accuracy, or services offered on third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Disclaimers</h2>
            <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
              <li>We do not guarantee the availability or continued accuracy of flight deals. Prices and availability change rapidly.</li>
              <li>We are not liable for missed deals, cancellations, or issues arising from third-party booking platforms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. Limitation of Liability</h2>
            <p className="mt-2 text-muted-foreground">
              To the maximum extent permitted by law, we are not responsible for any indirect, incidental, or consequential
              damages arising from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">9. Termination</h2>
            <p className="mt-2 text-muted-foreground">
              We reserve the right to suspend or terminate your account if you violate these Terms or misuse the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">10. Governing Law</h2>
            <p className="mt-2 text-muted-foreground">
              These Terms are governed by the laws of the Republic of the Philippines, without regard to conflict of laws
              principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">11. Contact Us</h2>
            <p className="mt-2 text-muted-foreground">
              For questions, support, or data requests, please contact us:<br />
              <span role="img" aria-label="email">📧</span> <span className="whitespace-nowrap">support@[yourdomain].com</span>
            </p>
          </section>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-sm text-primary underline underline-offset-4">
            ← Back to home
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <div className="mx-auto mb-3 w-10 h-10">
            <Image src="/footer-logo.png" alt="Cheap Flights Winnipeg logo" width={40} height={40} className="h-10 w-10 mx-auto" />
          </div>
          <div>
            © {new Date().getFullYear()} Cheap Flights Winnipeg · <Link href="/terms" className="underline underline-offset-4 text-primary">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


