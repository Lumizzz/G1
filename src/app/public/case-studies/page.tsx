"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react";

const caseStudies = [
  {
    slug: "luminary-tech-rebrand",
    title: "Complete Platform Rebrand & Redesign",
    client: "Luminary Tech",
    industry: "SaaS",
    challenge: "Outdated platform hurting brand perception and conversion rates.",
    results: { conversion: "+47%", users: "+120K", revenue: "+3.2M" },
  },
  {
    slug: "nova-ai-launch",
    title: "Launch Platform for AI Product",
    client: "Nova AI",
    industry: "Artificial Intelligence",
    challenge: "Needed a premium website that communicated cutting-edge technology.",
    results: { conversion: "+62%", users: "+200K", revenue: "+5.1M" },
  },
  {
    slug: "greenline-ecommerce",
    title: "E-commerce Platform Redesign",
    client: "Greenline",
    industry: "E-Commerce",
    challenge: "Legacy checkout causing 70% cart abandonment at step 2.",
    results: { conversion: "+83%", users: "+85K", revenue: "+1.8M" },
  },
  {
    slug: "meridian-health",
    title: "Patient Portal & Scheduling System",
    client: "Meridian Health",
    industry: "Healthcare",
    challenge: "Paper-based scheduling causing 30% no-show rate and staff overload.",
    results: { conversion: "+56%", users: "+45K", revenue: "+900K" },
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

export default function CaseStudiesPage() {
  return (
    <div className="overflow-hidden">
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Section>
            <p className="text-sm font-medium text-violet-400 mb-6">Case Studies</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[0.95]">
              Results that
              <span className="block bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">speak for themselves</span>
            </h1>
          </Section>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs, i) => (
            <Section key={i} delay={i * 0.1}>
              <Link href={`/public/case-studies/${cs.slug}`} className="group block">
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/20 transition-all">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300">{cs.industry}</span>
                    <span className="text-xs text-white/30">{cs.client}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-violet-300 transition-colors">{cs.title}</h3>
                  <p className="text-sm text-white/40 mb-6">{cs.challenge}</p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{cs.results.conversion}</p>
                      <p className="text-xs text-white/30">Conversion</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{cs.results.users}</p>
                      <p className="text-xs text-white/30">Users</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{cs.results.revenue}</p>
                      <p className="text-xs text-white/30">Revenue</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-violet-400 text-sm font-medium">
                    Read full case study
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Section>
          ))}
        </div>
      </section>
    </div>
  );
}
