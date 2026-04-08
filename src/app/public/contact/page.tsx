"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { createLead } from "@/actions/forms";
import { Mail, Phone, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await createLead({ ...form, source: "contact_page" });
    if (result.success) {
      router.push("/public/thank-you");
    } else {
      setError(result.error || "Failed to send message. Please try again.");
    }
    setLoading(false);
  };

  const section = useInView(0.1);

  return (
    <div className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={section.ref}
          initial={{ opacity: 0, y: 40 }}
          animate={section.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-violet-400 mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Let's build something great</h1>
          <p className="mt-4 text-white/40 max-w-xl mx-auto">Tell us about your project. We'll respond within 24 hours.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <label className="block text-sm text-white/60 mb-2">Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                placeholder="you@company.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/60 mb-2">Company</label>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Message *</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl disabled:opacity-50 hover:shadow-[0_0_25px_rgba(124,58,237,0.3)] transition-all"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <Mail size={20} className="text-violet-400 mb-3" />
              <h3 className="text-sm font-medium text-white mb-1">Email</h3>
              <p className="text-sm text-white/40">hello@aetheria.app</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <Phone size={20} className="text-violet-400 mb-3" />
              <h3 className="text-sm font-medium text-white mb-1">Phone</h3>
              <p className="text-sm text-white/40">+1 (555) 000-0000</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <MapPin size={20} className="text-violet-400 mb-3" />
              <h3 className="text-sm font-medium text-white mb-1">Location</h3>
              <p className="text-sm text-white/40">San Francisco, CA</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
