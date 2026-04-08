"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-4xl mx-auto px-6 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-300 text-sm mb-8">
          Ready to begin
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
          Your next chapter starts
          <span className="block bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            right here
          </span>
        </h2>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Let's build something extraordinary together. From concept to launch, we're here to turn your vision into a premium digital reality.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/public/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all duration-300"
          >
            Start a Project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/public/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 text-white/70 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 hover:text-white transition-all"
          >
            View Our Work
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
