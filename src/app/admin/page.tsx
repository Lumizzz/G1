"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard, Users, Mail, TrendingUp, FileText, ArrowUpRight
} from "lucide-react";

const statsCards = [
  { label: "Total Leads", value: "47", change: "+12%", icon: Users, color: "text-violet-400" },
  { label: "Subscribers", value: "1,234", change: "+8%", icon: Mail, color: "text-blue-400" },
  { label: "Page Views", value: "12.4K", change: "+23%", icon: TrendingUp, color: "text-green-400" },
  { label: "Published Posts", value: "8", change: "+2", icon: FileText, color: "text-yellow-400" },
];

const recentActivity = [
  { action: "New lead submitted", detail: "jane@company.com — 2 min ago" },
  { action: "Blog post published", detail: "\"The Future of Digital Intelligence\" — 1 hour ago" },
  { action: "Newsletter subscriber", detail: "mark@example.com — 3 hours ago" },
  { action: "Hero content updated", detail: "Headline changed by admin — 1 day ago" },
  { action: "New testimonial", detail: "David Park — 2 days ago" },
];

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-sm text-white/40 mt-1">Here's what's happening with your site.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={cn("w-5 h-5", stat.color)} />
                <span className="text-xs font-medium text-green-400 flex items-center gap-1">
                  {stat.change} <ArrowUpRight size={10} />
                </span>
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/40 mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-white/[0.02]">
                <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">{act.action}</p>
                  <p className="text-xs text-white/30 mt-0.5">{act.detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Create Blog Post", "Edit Hero Section", "View Leads", "Manage Pricing"].map((action) => (
              <button key={action} className="w-full text-left px-4 py-3 rounded-lg bg-white/5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                {action}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
