"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SeoEntry {
  page_key: string;
  meta_title: string;
  meta_description: string;
}

const defaultEntries: SeoEntry[] = [
  { page_key: "home", meta_title: "Aetheria — Intelligent Digital Experiences", meta_description: "Premium digital solutions powered by intelligence." },
  { page_key: "about", meta_title: "About Aetheria — Our Story & Mission", meta_description: "Learn about Aetheria's mission to create intelligent digital experiences." },
  { page_key: "features", meta_title: "Features — What Makes Aetheria Different", meta_description: "Explore the capabilities that set Aetheria apart." },
  { page_key: "pricing", meta_title: "Pricing — Transparent Plans for Every Stage", meta_description: "Choose the plan that fits your needs. From starter to enterprise." },
  { page_key: "contact", meta_title: "Contact Aetheria — Let's Build Something Great", meta_description: "Get in touch. We'd love to hear about your project." },
];

export default function AdminSeo() {
  const [entries, setEntries] = useState(defaultEntries);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editData, setEditData] = useState<SeoEntry>({ page_key: "", meta_title: "", meta_description: "" });
  const [saving, setSaving] = useState(false);

  const startEdit = (entry: SeoEntry) => {
    setEditingKey(entry.page_key);
    setEditData(entry);
  };

  const saveEdit = async () => {
    setSaving(true);
    setEntries(prev => prev.map(e => e.page_key === editData.page_key ? editData : e));
    await new Promise(r => setTimeout(r, 500));
    toast.success("SEO settings saved");
    setEditingKey(null);
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">SEO Settings</h1>
          <p className="text-sm text-white/40 mt-1">Manage meta titles and descriptions for each page.</p>
        </div>
        <Button onClick={saveEdit} disabled={saving}>
          {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
          Save All
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-6 p-6">
          {entries.map(entry => (
            <div key={entry.page_key} className="p-5 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-white capitalize">{entry.page_key}</p>
                <Button size="sm" variant="secondary" onClick={() => startEdit(entry)}>Edit</Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-white/60 truncate">{entry.meta_title}</p>
                <p className="text-xs text-white/30 truncate">{entry.meta_description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {editingKey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="w-full max-w-xl bg-[#12121a] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-6">Edit SEO - {editingKey}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60 mb-2 block">Meta Title</label>
                <Input value={editData.meta_title} onChange={e => setEditData({ ...editData, meta_title: e.target.value })} className="bg-white/5" />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">Meta Description</label>
                <textarea value={editData.meta_description} onChange={e => setEditData({ ...editData, meta_description: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 resize-none" />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="secondary" onClick={() => setEditingKey(null)}>Cancel</Button>
                <Button onClick={saveEdit}><Save size={14} className="mr-1" /> Save</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
