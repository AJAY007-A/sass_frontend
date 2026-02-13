"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Loader2, Users, DollarSign, Activity } from "lucide-react";
import { getMetrics, getUsers } from "@/services/adminService";

export default function AdminPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== "ADMIN") {
                router.push("/dashboard");
                return;
            }
            Promise.all([getMetrics(), getUsers(20)])
                .then(([metricsRes, usersRes]) => {
                    setStats(metricsRes.data.stats);
                    setUsers(usersRes.data.users);
                })
                .finally(() => setLoading(false));
        }
    }, [user, authLoading, router]);

    if (authLoading || loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)]">
            <Sidebar />
            <main className="flex-1 p-6 md:p-8 md:ml-64 space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Admin Analytics</h2>
                    <p className="text-muted-foreground">Platform overview and metrics</p>
                </div>

                {stats && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{(stats.totalRevenue / 100).toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">Lifetime revenue</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                                <p className="text-xs text-muted-foreground">{stats.newSignupsThisMonth} new this month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Subs</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
                                <p className="text-xs text-muted-foreground">{stats.churnRate}% churn rate</p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Email</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Role</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Plan</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {users.map((u) => (
                                        <tr key={u.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle">{u.email}</td>
                                            <td className="p-4 align-middle">
                                                <Badge variant={u.role === "ADMIN" ? "default" : "secondary"}>{u.role}</Badge>
                                            </td>
                                            <td className="p-4 align-middle">{u.subscription?.plan}</td>
                                            <td className="p-4 align-middle">
                                                <Badge variant={
                                                    u.subscription?.status === "ACTIVE" ? "success" :
                                                        u.subscription?.status === "CANCELED" ? "destructive" : "secondary"
                                                }>
                                                    {u.subscription?.status}
                                                </Badge>
                                            </td>
                                            <td className="p-4 align-middle text-muted-foreground">
                                                {new Date(u.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
