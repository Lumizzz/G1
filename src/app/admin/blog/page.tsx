"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const mockPosts = [
  { id: 1, title: "The Future of Digital Intelligence", status: "published", slug: "future-of-digital-intelligence", created_at: "2026-03-15T00:00:00Z" },
  { id: 2, title: "Design Systems That Actually Scale", status: "published", slug: "design-systems-that-scale", created_at: "2026-02-28T00:00:00Z" },
  { id: 3, title: "Performance as a Feature, Not an Afterthought", status: "published", slug: "performance-as-a-feature", created_at: "2026-02-10T00:00:00Z" },
  { id: 4, title: "Building for the Edge: A New Architecture", status: "draft", slug: "building-for-the-edge", created_at: "2026-03-01T00:00:00Z" },
];

export default function AdminBlog() {
  const [posts] = useState(mockPosts);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-sm text-white/40 mt-1">{posts.length} posts total</p>
        </div>
        <Link href="/admin/blog/new">
          <Button><Plus size={14} className="mr-1" /> New Post</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Title</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Status</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Date</th>
                <th className="text-right py-3 px-6 text-xs font-medium text-white/30 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 text-sm text-white font-medium">{post.title}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      post.status === "published"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-white/30">{new Date(post.created_at).toLocaleDateString()}</td>
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
