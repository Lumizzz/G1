"use client";

import Link from "next/link";

const footerLinks = {
  product: [
    { label: "Features", href: "/public/features" },
    { label: "Services", href: "/public/services" },
    { label: "Pricing", href: "/public/pricing" },
    { label: "Case Studies", href: "/public/case-studies" },
  ],
  company: [
    { label: "About", href: "/public/about" },
    { label: "Blog", href: "/public/blog" },
    { label: "Careers", href: "/public/blog" },
    { label: "Contact", href: "/public/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/public/privacy" },
    { label: "Terms of Service", href: "/public/terms" },
    { label: "Cookie Policy", href: "/public/cookies" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">Æ</span>
              </div>
              <span className="text-white font-semibold tracking-tight">Aetheria</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Intelligence meets design. Premium digital experiences built for the future.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-medium text-white/80 mb-4 capitalize">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} Aetheria. All rights reserved.</p>
          <p className="text-xs text-white/30">Designed with precision. Built with intelligence.</p>
        </div>
      </div>
    </footer>
  );
}
