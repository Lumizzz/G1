"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "For early-stage teams building their first premium product.",
    price: "2,499",
    period: "project",
    features: ["1 core feature set", "Basic analytics dashboard", "Responsive design", "Email support", "1 revision round"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    description: "For scaling companies that need a comprehensive digital presence.",
    price: "7,999",
    period: "project",
    features: ["Full website + CMS", "Admin dashboard", "AI assistant integration", "SEO optimization", "3 revision rounds", "30-day support"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For organizations requiring complete custom solutions.",
    price: "Custom",
    period: null,
    features: ["Full custom platform", "Priority support", "Dedicated team", "Custom integrations", "SLA guarantee", "Ongoing retainer option"],
    cta: "Contact Sales",
    popular: false,
  },
];

function Section({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <div className="overflow-hidden">
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Section>
            <p className="text-sm font-medium text-violet-400 mb-6">Pricing</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[0.95]">
              Transparent pricing.
              <span className="block bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Exceptional value.</span>
            </h1>
            <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
              No hidden fees. No scope creep. Just honest pricing for premium results.
            </p>
          </Section>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <Section key={i} delay={i * 0.15}>
                <div
                  className={cn(
                    "relative p-8 rounded-2xl border transition-all h-full flex flex-col",
                    plan.popular
                      ? "border-violet-500/30 bg-violet-500/[0.03] shadow-[0_0_40px_rgba(124,58,237,0.1)]"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-xs font-medium text-white">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                    <p className="text-sm text-white/40 mb-6">{plan.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      {plan.period && <span className="text-white/30 text-sm">/{plan.period}</span>}
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-sm text-white/60">
                        <Check size={16} className="text-violet-400 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/public/contact"
                    className={cn(
                      "block text-center py-3 rounded-xl text-sm font-medium transition-all",
                      plan.popular
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-[0_0_25px_rgba(124,58,237,0.3)]"
                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                    )}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
