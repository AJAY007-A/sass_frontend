"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { resetPassword } from "@/services/authService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { token } = useParams();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await resetPassword(token, password);
            setIsSubmitted(true);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid or expired token");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md bg-card/60 backdrop-blur-md border-primary/20 shadow-xl shadow-primary/5">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Set New Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter a strong password for your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSubmitted ? (
                        <div className="text-center space-y-6 py-4">
                            <div className="flex justify-center">
                                <div className="rounded-full bg-green-500/10 p-3 ring-1 ring-green-500/20">
                                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="font-semibold text-foreground">Password Reset Successful!</p>
                                <p className="text-sm text-muted-foreground">You can now sign in with your new password.</p>
                            </div>
                            <Link href="/login">
                                <Button className="w-full">
                                    Go to Login
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive border border-destructive/20 animate-in fade-in slide-in-from-top-1">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="password">
                                    New Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button className="w-full" type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Reset Password
                            </Button>
                        </form>
                    )}
                </CardContent>
                {!isSubmitted && (
                    <CardFooter className="justify-center border-t border-border/50 pt-4 mt-2">
                        <Link href="/login" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                        </Link>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
