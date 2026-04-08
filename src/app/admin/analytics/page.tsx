"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { TrendingUp, Users, Eye, Clock, ArrowUpRight } from "lucide-react";

const overviewStats = [
  { label: "Page Views (30d)", value: "12,450", change: "+23%", icon: Eye, color: "text-blue-400" },
  { label: "Unique Visitors", value: "8,320", change: "+18%", icon: Users, color: "text-violet-400" },
  { label: "Avg. Session", value: "4m 32s", change: "+12%", icon: Clock, color: "text-green-400" },
  { label: "Bounce Rate", value: "32%", change: "-5%", icon: TrendingUp, color: "text-yellow-400" },
];

const topPages = [
  { path: "/public", views: "4,200", pct: "34%" },
  { path: "/public/features", views: "2,100", pct: "17%" },
  { path: "/public/pricing", views: "1,850", pct: "15%" },
  { path: "/public/case-studies", views: "1,200", pct: "10%" },
  { path: "/public/contact", views: "980", pct: "8%" },
];

const sources = [
  { name: "Google Organic", visits: "5,200", pct: 42 },
  { name: "Direct", visits: "3,100", pct: 25 },
  { name: "Social", visits: "2,400", pct: 19 },
  { name: "Referral", visits: "1,750", pct: 14 },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-white/40 mt-1">Site performance overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((s, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <span className="text-xs text-green-400 flex items-center gap-1">{s.change} <ArrowUpRight size={10}/></span>
              </div>
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-white/40 mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-white">Top Pages</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-white font-mono">{p.path}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-white/50">{p.views}</span>
                    <span className="text-xs text-white/30">{p.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-white">Traffic Sources</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-5">
              {sources.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white">{s.name}</span>
                    <span className="text-sm text-white/50">{s.visits}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-purple-600" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
