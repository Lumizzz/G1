"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Group by category if available
  const grouped = items.reduce<Record<string, FaqItem[]>>((acc, item) => {
    const cat = item.category || "General";
    acc[cat] = acc[cat] || [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([category, faqs]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const globalIdx = items.indexOf(faq);
              const isOpen = openIndex === globalIdx;
              return (
                <div key={idx} className="rounded-xl border border-white/5 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                    onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                  >
                    <span className="text-base font-medium text-white pr-8">{faq.question}</span>
                    {isOpen ? (
                      <Minus size={20} className="text-violet-400 flex-shrink-0" />
                    ) : (
                      <Plus size={20} className="text-white/30 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-6 pb-6 text-sm text-white/50 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
