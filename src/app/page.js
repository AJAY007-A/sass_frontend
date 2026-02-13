"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 -z-10 h-full w-full bg-noise pointer-events-none" />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse" />

        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
          
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent pb-2">
              Ship your SaaS <br /> in hours, not weeks
            </h1>
            <p className="mt-8 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
              The ultimate production-ready starter kit. Authentication, Stripe, Razorpay, Admin, and Database — all pre-configured for speed.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/signup">
                <Button size="lg" className="rounded-full px-8 h-12 text-md shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing" className="text-sm font-semibold leading-6 text-muted-foreground hover:text-foreground transition-colors group">
                Review Pricing Plans <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 lg:px-8 pb-32">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">The Full Stack</h2>
            <p className="text-4xl font-bold tracking-tight sm:text-5xl">Engineered for quality</p>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
          {[
            {
              title: "Enterprise Auth",
              desc: "Secure login flow with sessions, JWT, and multi-provider support built on top of high-security standards.",
              icon: ShieldCheck,
              gradient: "from-blue-500/20 to-indigo-500/20"
            },
            {
              title: "Scalable Payments",
              desc: "Comprehensive billing engine for one-time payments or complex subscription models with tax support.",
              icon: CreditCard,
              gradient: "from-purple-500/20 to-pink-500/20"
            },
            {
              title: "Powerful Insights",
              desc: "Beautifully designed admin panel to track revenue, user growth, and system health in real-time.",
              icon: Zap,
              gradient: "from-orange-500/20 to-red-500/20"
            },
          ].map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative flex flex-col items-start rounded-3xl border border-white/10 bg-card/40 p-10 shadow-2xl backdrop-blur-md overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative rounded-2xl bg-primary/10 p-3 ring-1 ring-primary/20 mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-7 w-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="relative text-xl font-bold leading-8 mb-3">{feature.title}</h3>
              <p className="relative text-base leading-7 text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      <footer className="w-full border-t border-white/5 bg-background/50 backdrop-blur-sm py-16 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <div className="mb-6 flex justify-center gap-10">
            <Link href="https://www.linkedin.com/in/ajay-r-54a41b328/" className="hover:text-primary transition-colors">LinkedIn</Link>
            <Link href="https://github.com/AJAY007-A" className="hover:text-primary transition-colors">GitHub</Link>
            <Link href="https://www.instagram.com/http.ajazzz/" className="hover:text-primary transition-colors">Instagram</Link>
          </div>
          <p>&copy; 2026 SaaSKit. Built with love for developers.</p>
        </div>
      </footer>
    </div>
  );
}

function CreditCard(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
