"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex min-h-[calc(100vh-4rem)] relative overflow-hidden">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-grid-pattern opacity-10" />
            <Sidebar />
            <main className="flex-1 p-6 md:p-8 md:ml-64 relative z-10 max-w-7xl mx-auto w-full">
                {children}
            </main>
        </div>
    );
}
