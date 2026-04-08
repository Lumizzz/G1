"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "/public/features" },
  { label: "Services", href: "/public/services" },
  { label: "Pricing", href: "/public/pricing" },
  { label: "Case Studies", href: "/public/case-studies" },
  { label: "Blog", href: "/public/blog" },
  { label: "Contact", href: "/public/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/public" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-shadow">
            <span className="text-white font-bold text-sm">Æ</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">Aetheria</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2 rounded-lg"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/public/contact"
            className="ml-4 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow-[0_2px_15px_rgba(124,58,237,0.3)] hover:shadow-[0_2px_25px_rgba(124,58,237,0.5)] transition-all"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white/70 p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white transition-colors px-4 py-3 rounded-lg text-base"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/public/contact"
                onClick={() => setOpen(false)}
                className="mt-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-center font-medium rounded-lg"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
