"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Brain, Shield, Zap, Palette, BarChart3, Globe, Lock, Code2, Rocket, Clock, Layers, RefreshCcw } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Architecture", description: "Intelligent systems designed around your business logic. Our AI-assisted development pipeline accelerates delivery by 40% while maintaining enterprise-grade quality standards." },
  { icon: Shield, title: "Enterprise-Grade Security", description: "Bank-level AES-256 encryption, SOC 2 Type II compliance, and zero-trust architecture from day one. Your data stays yours." },
  { icon: Zap, title: "Lightning Performance", description: "Sub-second load times guaranteed. Global edge deployment with intelligent caching. Core Web Vitals optimized to green across every metric." },
  { icon: Palette, title: "Bespoke Design System", description: "Every pixel is intentional. Every interaction is choreographed. A custom design system built for your brand, not a template." },
  { icon: BarChart3, title: "Data-Driven Growth", description: "Built-in analytics, A/B testing framework, and conversion intelligence. Understand every visitor journey and optimize relentlessly." },
  { icon: Globe, title: "Global Scale", description: "Multi-region infrastructure with CDN-optimized assets. Zero latency worldwide. Auto-scaling that handles traffic spikes effortlessly." },
  { icon: Lock, title: "Authentication & AuthZ", description: "Role-based access control, SSO integration, MFA support, and session management. Granular permissions for every user type." },
  { icon: Code2, title: "Clean Code Architecture", description: "Modular, documented, and tested. TypeScript-first approach with strict linting. Code that your future team will thank you for." },
  { icon: Rocket, title: "Deployment Pipeline", description: "Automated CI/CD with preview environments, canary deployments, and instant rollbacks. Ship with confidence, not hope." },
  { icon: Clock, title: "Real-Time Collaboration", description: "Built-in commenting, version history, and multi-user editing. Your team works together seamlessly, across any distance." },
  { icon: Layers, title: "Component Library", description: "200+ reusable, accessible, and thoroughly tested components. Build new features in hours, not weeks." },
  { icon: RefreshCcw, title: "Continuous Optimization", description: "Post-launch monitoring, performance tuning, and feature iteration. We don't disappear after deployment." },
];

function Section({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  );
}

export default function FeaturesPage() {
  return (
    <div className="overflow-hidden">
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Section>
            <p className="text-sm font-medium text-violet-400 mb-6">Features</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[0.95]">
              Every capability.
              <span className="block bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Zero compromise.</span>
            </h1>
            <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
              A complete toolkit designed to deliver measurable impact, from your first launch to your millionth user.
            </p>
          </Section>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Section key={i} delay={i * 0.05}>
                <div className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/20 hover:bg-white/[0.04] transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all">
                    <f.icon size={20} className="text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{f.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{f.description}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
