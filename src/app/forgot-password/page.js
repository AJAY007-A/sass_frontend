"use client";

import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/services/authService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await forgotPassword(email);
            setIsSubmitted(true);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md bg-card/60 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to receive a reset link
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSubmitted ? (
                        <div className="text-center space-y-4">
                            <div className="rounded-md bg-green-500/15 p-3 text-sm text-green-500">
                                Check your email for a reset link.
                            </div>
                            <Link href="/login">
                                <Button variant="outline" className="w-full">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="email">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <Button className="w-full" type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send Reset Link
                            </Button>
                        </form>
                    )}
                </CardContent>
                {!isSubmitted && (
                    <CardFooter className="justify-center">
                        <Link href="/login" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                        </Link>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
