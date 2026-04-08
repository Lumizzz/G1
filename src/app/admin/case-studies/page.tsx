"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

const mockCases = [
  { id: 1, title: "Complete Platform Rebrand & Redesign", client: "Luminary Tech", industry: "SaaS", is_visible: true, created_at: "2026-03-15T00:00:00Z" },
  { id: 2, title: "Launch Platform for AI Product", client: "Nova AI", industry: "Artificial Intelligence", is_visible: true, created_at: "2026-02-20T00:00:00Z" },
  { id: 3, title: "E-commerce Platform Redesign", client: "Greenline", industry: "E-Commerce", is_visible: true, created_at: "2026-01-10T00:00:00Z" },
  { id: 4, title: "Patient Portal & Scheduling System", client: "Meridian Health", industry: "Healthcare", is_visible: true, created_at: "2025-12-05T00:00:00Z" },
];

export default function AdminCaseStudies() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Case Studies</h1>
          <p className="text-sm text-white/40 mt-1">{mockCases.length} case studies</p>
        </div>
        <Link href="/admin/case-studies/new">
          <Button><Plus size={14} className="mr-1" /> New Case Study</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Title</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Client</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Industry</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Visible</th>
                <th className="text-right py-3 px-6 text-xs font-medium text-white/30 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCases.map(cs => (
                <tr key={cs.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-4 px-6 text-sm text-white font-medium">{cs.title}</td>
                  <td className="py-4 px-6 text-sm text-white/50">{cs.client}</td>
                  <td className="py-4 px-6 text-sm text-white/50">{cs.industry}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${cs.is_visible ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}>
                      {cs.is_visible ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Eye size={14} className="text-white/40" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Pencil size={14} className="text-white/40" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Trash2 size={14} className="text-red-400" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
