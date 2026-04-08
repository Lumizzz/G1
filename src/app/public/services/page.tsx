"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { LayoutDashboard, Smartphone, LineChart, Cloud, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: LayoutDashboard,
    title: "Digital Platform Design",
    description: "End-to-end platform design and development for products that matter.",
    details: "Research, wireframes, visual design, prototyping, development, testing, and launch. We handle every phase so you get a complete product, not fragments.",
    steps: ["Discovery & Research", "Wireframing & IA", "Visual Design", "Development", "QA & Launch"],
  },
  {
    icon: Smartphone,
    title: "Mobile Experience",
    description: "Native and cross-platform applications that people love to use daily.",
    details: "React Native, Flutter, SwiftUI, Kotlin. Whether you need a single codebase across platforms or platform-specific native excellence, we deliver it.",
    steps: ["Platform Strategy", "UX Design", "Native Development", "App Store Submission", "Post-Launch Support"],
  },
  {
    icon: LineChart,
    title: "Growth & Analytics",
    description: "Data strategy, implementation, and ongoing optimization for compound growth.",
    details: "GA4, Mixpanel, custom dashboards, funnel analysis, cohort tracking. We turn raw data into actionable strategy that compounds monthly.",
    steps: ["Audit & Setup", "Tracking Strategy", "Dashboard Build", "Analysis & Insights", "Ongoing Optimization"],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable, secure, and cost-optimized cloud architecture you can rely on.",
    details: "AWS, GCP, Azure, Vercel. Auto-scaling, monitoring, CI/CD pipelines. Infrastructure designed to grow with your user base without breaking your budget.",
    steps: ["Architecture Design", "Provisioning", "CI/CD Setup", "Monitoring & Alerting", "Optimization"],
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

export default function ServicesPage() {
  return (
    <div className="overflow-hidden">
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Section>
            <p className="text-sm font-medium text-violet-400 mb-6">Services</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[0.95]">
              Full-spectrum digital
              <span className="block bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">capability</span>
            </h1>
            <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
              From concept to scale, we provide end-to-end digital product services.
            </p>
          </Section>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto space-y-24">
          {services.map((service, i) => (
            <Section key={i} delay={i * 0.1}>
              <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center", i % 2 === 1 && "lg:flex-row-reverse")}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-8">
                    <service.icon size={24} className="text-violet-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{service.title}</h2>
                  <p className="text-white/50 leading-relaxed mb-4">{service.description}</p>
                  <p className="text-sm text-white/30 leading-relaxed mb-8">{service.details}</p>
                  <Link
                    href="/public/contact"
                    className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium group"
                  >
                    Start a project
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-6">Our Process</p>
                    <div className="space-y-4">
                      {service.steps.map((step, si) => (
                        <div key={si} className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-xs font-medium text-violet-400">
                            {si + 1}
                          </div>
                          <span className="text-sm text-white/60">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </section>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
