"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";
import { insertRow } from "@/actions/cms";

export default function NewCaseStudy() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    client: "",
    industry: "",
    challenge: "",
    solution: "",
    cover_image_url: "",
    meta_title: "",
    meta_description: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const result = await insertRow("case_studies", {
      ...form,
      slug: form.slug || slugify(form.title),
      is_visible: true,
    });
    if (result.success) {
      toast.success("Case study created");
      router.push("/admin/case-studies");
    } else {
      toast.error(result.error);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}><ArrowLeft size={20} /></Button>
          <div>
            <h1 className="text-2xl font-bold text-white">New Case Study</h1>
            <p className="text-sm text-white/40 mt-1">Add a new case study.</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}><Save size={16} className="mr-2" /> Publish</Button>
      </div>

      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Title *</label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })} className="bg-white/5" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Slug</label>
              <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="bg-white/5 font-mono text-xs" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Client</label>
              <Input value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} className="bg-white/5" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Industry</label>
              <Input value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} className="bg-white/5" />
            </div>
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Challenge</label>
            <textarea value={form.challenge} onChange={e => setForm({ ...form, challenge: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 resize-none" />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Solution *</label>
            <textarea value={form.solution} onChange={e => setForm({ ...form, solution: e.target.value })} rows={6} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 resize-none" />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Cover Image URL</label>
            <Input value={form.cover_image_url} onChange={e => setForm({ ...form, cover_image_url: e.target.value })} className="bg-white/5 font-mono text-xs" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Meta Title</label>
              <Input value={form.meta_title} onChange={e => setForm({ ...form, meta_title: e.target.value })} className="bg-white/5" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Meta Description</label>
              <Input value={form.meta_description} onChange={e => setForm({ ...form, meta_description: e.target.value })} className="bg-white/5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
