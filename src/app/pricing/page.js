"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createSubscription } from "@/services/billingService";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";
import Script from "next/script";

const plans = [
    {
        name: "Basic",
        key: "BASIC",
        price: 399,
        features: ["5 Projects", "Basic Analytics", "Email Support", "1 Team Member"],
    },
    {
        name: "Pro",
        key: "PRO",
        price: 599,
        highlighted: true,
        features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "10 Team Members", "Custom Integrations"],
    },
    {
        name: "Premium",
        key: "PREMIUM",
        price: 799,
        features: ["Everything in Pro", "Dedicated Manager", "SLA Guarantee", "Unlimited Team Members", "API Access"],
    },
];

export default function PricingPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState("");

    const handleSubscribe = async (planKey) => {
        if (!user) {
            window.location.href = "/signup";
            return;
        }

        setLoading(planKey);
        setError("");

        try {
            console.log("Creating subscription for:", planKey);
            const res = await createSubscription(planKey);
            console.log("Subscription Response:", res);

            const { subscriptionId, razorpayKeyId } = res.data;

            if (!window.Razorpay) {
                setError("Payment system unavailable. Please refresh.");
                setLoading(null);
                return;
            }

            const options = {
                key: razorpayKeyId,
                subscription_id: subscriptionId,
                name: "sasskit",
                description: `${planKey} Subscription`,
                handler: () => {
                    window.location.href = "/dashboard";
                },
                prefill: {
                    email: user.email
                },
                theme: { color: "#6366F1" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Subscription Error:", err);
            setError(err.response?.data?.message || "Failed to initiate payment");
        } finally {
            setLoading(planKey === loading ? null : loading); // Reset if needed
            setLoading(null);
        }
    };

    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            <div className="mx-auto max-w-7xl text-center">
                <h2 className="text-base font-semibold leading-7 text-primary font-mono tracking-widest uppercase">Premium Membership</h2>
                <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl text-foreground">Choose your power level</h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                    Unlock exclusive features, priority support, and advanced analytics for your business.
                </p>
            </div>

            {error && (
                <div className="max-w-md mx-auto mt-8 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                    {error}
                </div>
            )}

            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3 px-4">
                {plans.map((plan) => (
                    <Card
                        key={plan.key}
                        className={`flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 ${plan.highlighted ? "border-primary/50 shadow-xl shadow-primary/10 scale-105 bg-primary/5" : "bg-card/50"
                            }`}
                    >
                        <CardHeader>
                            <div className="flex items-center justify-between mb-4">
                                <CardTitle className="text-xl font-bold uppercase tracking-wider">{plan.name}</CardTitle>
                                {plan.highlighted && (
                                    <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1">
                                        Best Value
                                    </Badge>
                                )}
                                {user?.subscription?.plan === plan.key && (
                                    <Badge variant="success" className="px-3 py-1">Active</Badge>
                                )}
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-extrabold text-foreground">₹{plan.price}</span>
                                <span className="text-muted-foreground font-medium">/month</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="space-y-4">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-sm font-medium">
                                        <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center mr-3 shrink-0">
                                            <Check className="h-3 w-3 text-green-500" strokeWidth={3} />
                                        </div>
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="pt-8">
                            <Button
                                className={`w-full h-12 text-md font-bold transition-all ${plan.highlighted ? "bg-primary hover:scale-[1.02]" : ""
                                    }`}
                                variant={plan.highlighted ? "default" : "outline"}
                                disabled={user?.subscription?.plan === plan.key || loading === plan.key}
                                onClick={() => handleSubscribe(plan.key)}
                            >
                                {user?.subscription?.plan === plan.key
                                    ? "Active Plan"
                                    : loading === plan.key ? "Connecting..." : "Get Started"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
