"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Target, Heart, Lightbulb, Users, Globe, Trophy } from "lucide-react";

function Section({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const stats = [
  { label: "Projects Delivered", value: "120+" },
  { label: "Happy Clients", value: "85" },
  { label: "Team Members", value: "24" },
  { label: "Countries Served", value: "15" },
];

const values = [
  { icon: Target, title: "Precision", desc: "Every pixel, every line of code — intentional. We don't guess, we engineer." },
  { icon: Heart, title: "Craft", desc: "We care deeply about the quality of what we ship. It's not a job, it's our standard." },
  { icon: Lightbulb, title: "Innovation", desc: "We push boundaries so our clients stay ahead. Tomorrow's best practice, today." },
  { icon: Users, title: "Partnership", desc: "We don't work for you — we work with you. Your goals become ours." },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Section delay={0}>
            <p className="text-sm font-medium text-violet-400 mb-6">Our Story</p>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.95]">
              We build digital products
              <span className="block bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">that define categories</span>
            </h1>
            <p className="mt-8 text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
              Aetheria was founded on a simple belief: the gap between great design and great engineering should not exist.
              We close that gap for ambitious teams.
            </p>
          </Section>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Section key={i} delay={i * 0.1} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/40 mt-2">{stat.label}</p>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto">
          <Section className="text-center mb-16">
            <p className="text-sm font-medium text-violet-400 mb-4">Our Values</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">How we work</h2>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Section key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/20 transition-all h-full">
                  <v.icon size={24} className="text-violet-400 mb-6" />
                  <h3 className="text-lg font-semibold text-white mb-3">{v.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{v.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Section>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Our mission is to make premium digital experiences accessible to every ambitious brand.
            </h2>
            <p className="mt-8 text-lg text-white/40 leading-relaxed">
              We believe that exceptional design and engineering shouldn't be a luxury. Through our platform, we bring the
              capabilities of world-class digital agencies to companies of every size — with the speed, intelligence, and
              care that modern businesses demand.
            </p>
          </Section>
        </div>
      </section>
    </div>
  );
}
