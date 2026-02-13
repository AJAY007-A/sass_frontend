"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getMe } from "@/services/authService";
import { Loader2 } from "lucide-react";

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { loginUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            // Save token immediately so getMe() can use it in headers
            localStorage.setItem("token", token);

            getMe()
                .then(res => {
                    loginUser(res.data.user, token);
                    router.push("/dashboard");
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    router.push("/login");
                });
        } else {
            router.push("/login");
        }
    }, [searchParams, router, loginUser]);

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
}

export default function AuthSuccessPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
