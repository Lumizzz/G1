"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, FileText, Palette, Type, List, MessageSquare, BarChart3,
  Image, Mail, Users, Shield, Settings, LogOut, ChevronDown, ChevronRight,
  Sparkles, Globe, Scale, Star, DollarSign, HelpCircle, Newspaper, FolderOpen
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  {
    icon: FileText, label: "Content", children: [
      { label: "Hero Editor", href: "/admin/content/hero" },
      { label: "Sections", href: "/admin/content/sections" },
      { label: "Navigation", href: "/admin/content/navigation" },
      { label: "Footer", href: "/admin/content/footer" },
      { label: "Branding", href: "/admin/branding" },
    ]
  },
  { icon: Sparkles, label: "Features", href: "/admin/features" },
  { icon: List, label: "Services", href: "/admin/services" },
  { icon: DollarSign, label: "Pricing", href: "/admin/pricing" },
  { icon: HelpCircle, label: "FAQ", href: "/admin/faq" },
  { icon: Star, label: "Testimonials", href: "/admin/testimonials" },
  { icon: Newspaper, label: "Blog", href: "/admin/blog" },
  { icon: FolderOpen, label: "Case Studies", href: "/admin/case-studies" },
  { icon: Image, label: "Media Library", href: "/admin/media" },
  { icon: Mail, label: "Leads", href: "/admin/leads" },
  { icon: Globe, label: "Newsletter", href: "/admin/newsletter" },
  { icon: Type, label: "SEO Settings", href: "/admin/seo" },
  { icon: MessageSquare, label: "AI Settings", href: "/admin/ai" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Scale, label: "Legal Pages", href: "/admin/legal" },
  { icon: Settings, label: "Site Settings", href: "/admin/settings" },
];

function NavItem({ item }: { item: typeof navItems[0] }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  if ("children" in item) {
    const isActive = item.children.some((c: { href: string }) => pathname.startsWith(c.href));
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
            isActive ? "text-white bg-white/5" : "text-white/50 hover:text-white/80 hover:bg-white/[0.02]"
          )}
        >
          <item.icon size={18} />
          <span className="flex-1 text-left">{item.label}</span>
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {expanded && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map((child: { label: string; href: string }) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block px-3 py-2 rounded-lg text-sm transition-colors",
                  pathname === child.href ? "text-violet-400 bg-violet-500/5" : "text-white/40 hover:text-white/60"
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  const active = pathname === item.href || pathname.startsWith(item.href + "/");
  return (
    <Link
      href={item.href!}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
        active ? "text-white bg-white/5" : "text-white/50 hover:text-white/80 hover:bg-white/[0.02]"
      )}
    >
      <item.icon size={18} />
      {item.label}
    </Link>
  );
}

export function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#111118] border-r border-white/5 overflow-y-auto z-50">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          <span className="text-white font-semibold tracking-tight">Aetheria Admin</span>
        </Link>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="mt-8 pt-4 border-t border-white/5">
          <a href="/public" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/40 hover:text-white/60 transition-colors">
            <LogOut size={18} />
            View Site
          </a>
        </div>
      </div>
    </aside>
  );
}
