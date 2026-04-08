"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateHero, getHero } from "@/actions/cms";

const defaultHero = {
  headline: "Building the Future of Digital Intelligence",
  subheadline: "Where visionary ideas meet precision engineering. We craft immersive digital experiences that define categories and captivate audiences.",
  cta_primary_text: "Start Building",
  cta_primary_link: "/public/contact",
  cta_secondary_text: "See Our Work",
  cta_secondary_link: "/public/case-studies",
  bg_video_url: "",
  bg_image_url: "",
};

export default function AdminHero() {
  const [form, setForm] = useState(defaultHero);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getHero();
    if (data) setForm({ ...defaultHero, ...data });
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateHero(form);
    if (result.success) {
      toast.success("Hero updated");
    } else {
      toast.error(result.error || "Failed to update");
    }
    setSaving(false);
  };

  if (loading) return <p className="text-white/40">Loading...</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Hero Editor</h1>
          <p className="text-sm text-white/40 mt-1">Edit the hero section of the homepage.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
          Save Changes
        </Button>
      </div>

      <Card>
        <CardContent className="p-6 space-y-5">
          <div>
            <label className="text-sm text-white/60 mb-2 block">Headline *</label>
            <Input value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} className="bg-white/5 text-lg" />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Subheadline</label>
            <textarea
              value={form.subheadline || ""}
              onChange={e => setForm({ ...form, subheadline: e.target.value })}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Primary CTA Text</label>
              <Input value={form.cta_primary_text || ""} onChange={e => setForm({ ...form, cta_primary_text: e.target.value })} className="bg-white/5" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Primary CTA Link</label>
              <Input value={form.cta_primary_link || ""} onChange={e => setForm({ ...form, cta_primary_link: e.target.value })} className="bg-white/5" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Secondary CTA Text</label>
              <Input value={form.cta_secondary_text || ""} onChange={e => setForm({ ...form, cta_secondary_text: e.target.value })} className="bg-white/5" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Secondary CTA Link</label>
              <Input value={form.cta_secondary_link || ""} onChange={e => setForm({ ...form, cta_secondary_link: e.target.value })} className="bg-white/5" />
            </div>
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Background Video URL (optional)</label>
            <Input value={form.bg_video_url || ""} onChange={e => setForm({ ...form, bg_video_url: e.target.value })} placeholder="https://..." className="bg-white/5 font-mono text-xs" />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Background Image URL (optional)</label>
            <Input value={form.bg_image_url || ""} onChange={e => setForm({ ...form, bg_image_url: e.target.value })} placeholder="https://..." className="bg-white/5 font-mono text-xs" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
