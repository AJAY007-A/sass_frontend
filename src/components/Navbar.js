"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Loader2, LayoutDashboard, CreditCard, Shield, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-background/60 backdrop-blur-xl">
            <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <LayoutDashboard className="h-5 w-5" />
                    </div>
                    SaaSKit
                </Link>

                {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : user ? (
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <span className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
                            )}>Dashboard</span>
                        </Link>
                        {user.role === "ADMIN" && (
                            <Link href="/admin">
                                <span className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === "/admin" ? "text-primary" : "text-muted-foreground"
                                )}>Admin</span>
                            </Link>
                        )}
                        <div className="flex items-center gap-3 pl-4 border-l ml-4 h-6">
                            <span className="text-sm font-medium">{user.email}</span>
                            <Button variant="ghost" size="sm" onClick={logout} className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            Pricing
                        </Link>
                        <Link href="/login">
                            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Sign In</Button>
                        </Link>
                        <Link href="/signup">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
