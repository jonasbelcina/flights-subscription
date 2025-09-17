"use client";

import { useEffect, useMemo, useState } from "react";
import PaypalButton from "@/components/PaypalButton";
import { Button } from "@/components/ui/button";

type Plan = "monthly" | "annual";

type SubscribeModalProps = {
  triggerLabel: string;
  className?: string;
  buttonVariant?: "default" | "secondary" | "link";
  prices: { monthly: number; annual: number };
  planIds?: { monthly?: string; annual?: string };
  defaultPlan?: Plan;
};

export default function SubscribeModal({
  triggerLabel,
  className,
  buttonVariant = "default",
  prices,
  planIds,
  defaultPlan = "monthly",
}: SubscribeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState<Plan>(defaultPlan);

  const amount = useMemo(() => {
    return plan === "monthly" ? String(prices.monthly) : String(prices.annual);
  }, [plan, prices]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <Button variant={buttonVariant} className={className} onClick={() => setIsOpen(true)}>
        {triggerLabel}
      </Button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">Complete your subscription</h2>
                <p className="mt-1 text-sm text-muted-foreground">Choose a plan and pay securely with PayPal.</p>
              </div>
              <button
                aria-label="Close"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mt-4 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label htmlFor="plan" className="block text-sm font-medium">
                  Plan
                </label>
                <select
                  id="plan"
                  className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value as Plan)}
                >
                  <option value="monthly">Monthly — ${prices.monthly}</option>
                  <option value="annual">Annual — ${prices.annual}</option>
                </select>
              </div>

              <div className="mt-6">
                {planIds?.monthly || planIds?.annual ? (
                  <PaypalButton
                    mode="subscription"
                    planId={plan === "monthly" ? planIds?.monthly : planIds?.annual}
                    onApproveMessage={`Subscription for ${plan} plan started!`}
                  />
                ) : (
                  <PaypalButton amount={amount} onApproveMessage={`Payment for ${plan} plan completed!`} />
                )}
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                You can cancel anytime. By completing the payment, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}


