"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const defaultFeatures = [
  { id: 1, icon: "brain-circuit", title: "AI-Powered Architecture", description: "Intelligent systems designed around your business logic. Automation that thinks." },
  { id: 2, icon: "shield-check", title: "Enterprise-Grade Security", description: "Bank-level encryption, SOC 2 compliance, and zero-trust architecture from day one." },
  { id: 3, icon: "zap", title: "Lightning Performance", description: "Sub-second load times. Global edge deployment. Zero compromise on speed." },
  { id: 4, icon: "palette", title: "Bespoke Design", description: "Every pixel intentional. Every interaction choreographed. Every experience elevated." },
  { id: 5, icon: "bar-chart-3", title: "Data-Driven Growth", description: "Analytics, A/B testing, and conversion intelligence built into every layer." },
  { id: 6, icon: "globe", title: "Global Scale", description: "Multi-region infrastructure. CDN-optimized assets. Zero-latency worldwide." },
];

const defaultTestimonials = [
  { id: 1, author_name: "Sarah Chen", author_role: "CEO, Luminary Tech", company: "Luminary Tech", content: "Aetheria didn't just build our website — they elevated our entire brand. The result is something we're proud to show every single day.", rating: 5 },
  { id: 2, author_name: "Marcus Rivera", author_role: "Head of Product, Nova AI", company: "Nova AI", content: "The attention to detail, the motion design, the backend architecture — everything was handled with exceptional care and expertise.", rating: 5 },
  { id: 3, author_name: "Elena Vasquez", author_role: "Founder, Greenline", company: "Greenline", content: "Working with Aetheria felt like having a world-class CTO and creative director on our team from day one.", rating: 5 },
];

const defaultServices = [
  { id: 1, title: "Digital Platform Design", description: "End-to-end platform design and development for products that matter.", details: "Research, wireframes, visual design, prototyping, development, testing, launch." },
  { id: 2, title: "Mobile Experience", description: "Native and cross-platform applications that people love to use daily.", details: "React Native, Flutter, SwiftUI, Kotlin. One codebase or platform-specific." },
  { id: 3, title: "Growth & Analytics", description: "Data strategy, implementation, and ongoing optimization for compound growth.", details: "GA4, Mixpanel, custom dashboards, funnel analysis, cohort tracking." },
  { id: 4, title: "Cloud Infrastructure", description: "Scalable, secure, and cost-optimized cloud architecture you can rely on.", details: "AWS, GCP, Azure, Vercel. Auto-scaling, monitoring, CI/CD." },
];

import { useInView } from "@/hooks/use-in-view";
import Link from "next/link";
import { ArrowRight, Star, ChevronDown, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { CtaSection } from "@/components/public/cta-section";
import { NewsletterSignup } from "@/components/public/newsletter-signup";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/public/hero/hero-3d").then(m => m.Hero3D), { ssr: false });

function SectionWrapper({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

function iconForName(name: string) {
  // Simple icon mapping - in production use dynamic import
  return name;
}

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ======== HERO ======== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a1a] to-[#0a0a0f]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-600/8 blur-[150px]" />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-300 text-sm">
              <Sparkles size={14} />
              <span>Intelligence meets design</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
          >
            <span className="text-white">Building the </span>
            <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
              Future of Digital
            </span>
            <span className="text-white"> Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed"
          >
            Where visionary ideas meet precision engineering. We craft immersive digital experiences that define categories and captivate audiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/public/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all duration-300">
              Start Building
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/public/case-studies" className="inline-flex items-center gap-2 px-8 py-4 text-white/70 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all">
              See Our Work
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={24} className="text-white/20 animate-bounce" />
        </motion.div>
      </section>

      {/* ======== FEATURES ======== */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper className="text-center mb-20">
            <p className="text-sm font-medium text-violet-400 mb-4">Capabilities</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">What sets us apart</h2>
            <p className="mt-4 text-white/40 max-w-xl mx-auto">Every capability is designed to deliver measurable impact for your business.</p>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultFeatures.map((feature, i) => (
              <SectionWrapper key={feature.id} delay={i * 0.1}>
                <div className="group h-full p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/20 hover:bg-white/[0.04] transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors">
                    <Sparkles size={20} className="text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SERVICES ======== */}
      <section className="py-32 px-6 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper className="text-center mb-20">
            <p className="text-sm font-medium text-violet-400 mb-4">Services</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">How we help you grow</h2>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defaultServices.map((service, i) => (
              <SectionWrapper key={service.id} delay={i * 0.1}>
                <div className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <ArrowUpRight size={18} className="text-violet-400" />
                    </div>
                    <span className="text-xs text-white/20 font-mono">0{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">{service.description}</p>
                  <p className="text-xs text-white/30">{service.details}</p>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ======== TESTIMONIALS ======== */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper className="text-center mb-20">
            <p className="text-sm font-medium text-violet-400 mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Trusted by leaders</h2>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {defaultTestimonials.map((t, i) => (
              <SectionWrapper key={t.id} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                      <Star key={idx} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed flex-1 mb-8">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-500/30 flex items-center justify-center text-sm font-medium text-white">
                      {t.author_name[0]}
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{t.author_name}</p>
                      <p className="text-xs text-white/30">{t.author_role}</p>
                    </div>
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CTA ======== */}
      <CtaSection />

      {/* ======== NEWSLETTER ======== */}
      <section className="pb-32 px-6">
        <div className="max-w-xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}
