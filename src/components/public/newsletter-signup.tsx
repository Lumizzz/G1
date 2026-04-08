"use client";

import { useState, type FormEvent } from "react";
import { subscribeNewsletter } from "@/actions/forms";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const { ref, inView } = useInView(0.3);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    const result = await subscribeNewsletter(email);
    if (result.success) {
      setStatus("success");
      setMessage("You're in. We'll keep you posted.");
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong.");
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="p-8 rounded-2xl bg-white/[0.02] border border-white/5"
    >
      <p className="text-sm font-medium text-violet-400 mb-3">Stay Updated</p>
      <h3 className="text-xl font-semibold text-white mb-2">Join our newsletter</h3>
      <p className="text-sm text-white/40 mb-6">Insights on design, technology, and digital transformation. No spam, ever.</p>

      {status === "success" ? (
        <p className="text-sm text-green-400">{message}</p>
      ) : status === "error" ? (
        <p className="text-sm text-red-400">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium rounded-xl disabled:opacity-50 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}
    </motion.div>
  );
}
