"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type PaypalButtonProps = {
  // One-time mode
  amount?: string;
  currency?: string;
  // Subscription mode
  mode?: "one-time" | "subscription";
  planId?: string;
  className?: string;
  onApproveMessage?: string;
};

export default function PaypalButton({
  amount,
  currency = "CAD",
  mode = "one-time",
  planId,
  className,
  onApproveMessage = "Payment completed! Thank you.",
}: PaypalButtonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSdkReady, setIsSdkReady] = useState(false);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  useEffect(() => {
    if (!isSdkReady) return;
    const paypal = (window as any).paypal;
    if (!paypal || !containerRef.current) return;

    // Clear any previous buttons before rendering again
    containerRef.current.innerHTML = "";

    const config: any = {
      style: { layout: "vertical", color: "gold", shape: "rect", label: "paypal" },
      onError: (err: any) => {
        console.error("PayPal Buttons error", err);
        alert("There was an error processing your payment. Please try again.");
      },
    };

    if (mode === "subscription") {
      if (!planId) {
        console.error("Missing planId for subscription mode");
        return;
      }
      config.createSubscription = (_data: any, actions: any) => {
        return actions.subscription.create({ plan_id: planId });
      };
      config.onApprove = async (data: any) => {
        alert(`Subscription created! ID: ${data.subscriptionID}`);
      };
    } else {
      config.createOrder = (_data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: { value: amount, currency_code: currency },
            },
          ],
        });
      };
      config.onApprove = async (_data: any, actions: any) => {
        await actions.order.capture();
        alert(onApproveMessage);
      };
    }

    paypal.Buttons(config).render(containerRef.current);
  }, [isSdkReady, amount, currency, onApproveMessage, mode, planId]);

  const sdkUrlParams = new URLSearchParams({
    "client-id": clientId || "",
    currency,
    components: "buttons",
    ...(mode === "subscription" ? { intent: "subscription", vault: "true" } : {}),
  });

  return (
    <div className={className}>
      {!clientId ? (
        <div className="text-sm text-red-600">
          Missing NEXT_PUBLIC_PAYPAL_CLIENT_ID. Set it in your environment.
        </div>
      ) : null}
      <Script
        src={`https://www.paypal.com/sdk/js?${sdkUrlParams.toString()}`}
        strategy="afterInteractive"
        onLoad={() => setIsSdkReady(true)}
      />
      <div ref={containerRef} />
    </div>
  );
}


