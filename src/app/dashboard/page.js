"use client";

import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { LayoutDashboard, Zap, CreditCard, Shield } from "lucide-react";

export default function DashboardPage() {
    const { user } = useAuth();
    const plan = user?.subscription?.plan || "FREE";

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Welcome back to your workspace</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Plan Status</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{plan}</div>
                        <p className="text-xs text-muted-foreground">
                            {user?.subscription?.status || "INACTIVE"}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Usage</CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Active</div>
                        <p className="text-xs text-muted-foreground">
                            Account in good standing
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-4">
                            <span className="text-muted-foreground">Email</span>
                            <span className="font-medium">{user?.email}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-4">
                            <span className="text-muted-foreground">Role</span>
                            <Badge variant={user?.role === "ADMIN" ? "default" : "secondary"}>
                                {user?.role}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between border-b pb-4">
                            <span className="text-muted-foreground">Member Since</span>
                            <span className="font-medium">
                                {new Date(user?.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">User ID</span>
                            <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                                {user?.id}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Subscription</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium">Current Plan: {plan}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {plan === "FREE"
                                        ? "Upgrade to unlock premium features."
                                        : "You have access to all features."}
                                </p>
                            </div>

                            {plan === "FREE" && (
                                <Link href="/pricing">
                                    <Button className="w-full">Upgrade Plan</Button>
                                </Link>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
