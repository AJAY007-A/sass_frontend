"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutDashboard, CreditCard, Shield, Settings, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuth();

    const links = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/pricing", label: "Subscription", icon: CreditCard },
    ];

    if (user?.role === "ADMIN") {
        links.push({ href: "/admin", label: "Admin Analytics", icon: Shield });
    }

    return (
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background/50 backdrop-blur-sm hidden md:block">
            <div className="flex flex-col gap-1 p-4">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href}>
                            <span className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}>
                                <Icon className="h-4 w-4" />
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}