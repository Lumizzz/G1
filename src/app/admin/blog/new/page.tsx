"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, ArrowLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";
import { insertRow } from "@/actions/cms";

export default function NewBlogPost() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", cover_image_url: "",
    meta_title: "", meta_description: "", status: "draft" as "draft" | "published",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const result = await insertRow("blog_posts", {
      ...form,
      slug: form.slug || slugify(form.title),
    });
    if (result.success) {
      toast.success("Blog post created");
      router.push("/admin/blog");
    } else {
      toast.error(result.error);
    }
    setSaving(false);
  };

  const handlePublish = async () => {
    setSaving(true);
    const result = await insertRow("blog_posts", {
      ...form,
      slug: form.slug || slugify(form.title),
      status: "published",
      published_at: new Date().toISOString(),
    });
    if (result.success) {
      toast.success("Blog post published");
      router.push("/admin/blog");
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
            <h1 className="text-2xl font-bold text-white">New Blog Post</h1>
            <p className="text-sm text-white/40 mt-1">Write and publish a new blog post.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleSave} disabled={saving}><Save size={16} className="mr-2" /> Save Draft</Button>
          <Button onClick={handlePublish} disabled={saving}>Publish</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Title *</label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })} className="bg-white/5 text-lg" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Slug</label>
              <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="bg-white/5 font-mono text-xs" />
            </div>
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Excerpt</label>
            <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 resize-none" />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Content *</label>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={16} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 resize-none font-mono" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Cover Image URL</label>
              <Input value={form.cover_image_url} onChange={e => setForm({ ...form, cover_image_url: e.target.value })} className="bg-white/5 font-mono text-xs" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as "draft" | "published" })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
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
