"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockSubs = [
  { id: 1, email: "jane@company.com", is_confirmed: true, created_at: "2026-03-20T10:00:00Z" },
  { id: 2, email: "mark@startup.io", is_confirmed: true, created_at: "2026-03-19T15:30:00Z" },
  { id: 3, email: "sarah@enterprise.com", is_confirmed: true, created_at: "2026-03-18T09:15:00Z" },
  { id: 4, email: "alex@design.studio", is_confirmed: false, created_at: "2026-03-17T14:00:00Z" },
  { id: 5, email: "james@tech.co", is_confirmed: true, created_at: "2026-03-16T11:45:00Z" },
  { id: 6, email: "amara@brightpath.io", is_confirmed: true, created_at: "2026-03-15T08:30:00Z" },
];

export default function AdminNewsletter() {
  const [subs] = useState(mockSubs);

  const exportCSV = () => {
    const csv = ["Email,Confirmed,Date"];
    subs.forEach(s => csv.push(`${s.email},${s.is_confirmed},${new Date(s.created_at).toLocaleDateString()}`));
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Newsletter</h1>
          <p className="text-sm text-white/40 mt-1">{subs.length} subscribers</p>
        </div>
        <Button onClick={exportCSV}><Download size={14} className="mr-1" /> Export CSV</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Email</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Status</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {subs.map(sub => (
                <tr key={sub.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-4 px-6 text-sm text-white font-mono">{sub.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${sub.is_confirmed ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}>
                      {sub.is_confirmed ? "Confirmed" : "Pending"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-white/30">{new Date(sub.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
