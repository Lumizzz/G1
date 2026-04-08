"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockLeads = [
  { id: 1, name: "Jane Smith", email: "jane@company.com", company: "Luminary Tech", phone: "+1 555-0101", status: "new", created_at: "2026-03-20T10:00:00Z" },
  { id: 2, name: "Mark Johnson", email: "mark@startup.io", company: "StartupIO", phone: null, status: "contacted", created_at: "2026-03-19T15:30:00Z" },
  { id: 3, name: "Sarah Lee", email: "sarah@enterprise.com", company: "Enterprise Co", phone: "+1 555-0202", status: "qualified", created_at: "2026-03-18T09:15:00Z" },
  { id: 4, name: "Alex Chen", email: "alex@design.studio", company: "Design Studio", phone: null, status: "converted", created_at: "2026-03-17T14:00:00Z" },
  { id: 5, name: "David Kim", email: "david@webapp.co", company: "WebApp Co", phone: "+1 555-0303", status: "lost", created_at: "2026-03-16T11:45:00Z" },
];

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  qualified: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  converted: "bg-green-500/10 text-green-400 border-green-500/20",
  lost: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminLeads() {
  const [filter, setFilter] = useState("all");
  const leads = filter === "all" ? mockLeads : mockLeads.filter(l => l.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-sm text-white/40 mt-1">{mockLeads.length} total submissions</p>
        </div>
        <div className="flex gap-2">
          {["all", "new", "contacted", "qualified", "converted", "lost"].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === s ? "bg-violet-500/20 text-violet-300" : "bg-white/5 text-white/40 hover:text-white/60"}`}
            >{s}</button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Name</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Email</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Company</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Status</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 text-sm text-white">{lead.name}</td>
                  <td className="py-4 px-6 text-sm text-white/50">{lead.email}</td>
                  <td className="py-4 px-6 text-sm text-white/50">{lead.company || "—"}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-white/30">{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
