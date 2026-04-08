"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Image as ImageIcon, Trash2, Download } from "lucide-react";
import { toast } from "sonner";
import { uploadMedia, getMedia, deleteMedia } from "@/actions/media";

const mockMedia = [
  { id: 1, file_name: "hero-bg.jpg", file_type: "image/jpeg", file_size: 245000, url: "", alt_text: "Hero background" },
  { id: 2, file_name: "logo.png", file_type: "image/png", file_size: 12000, url: "", alt_text: "Company logo" },
  { id: 3, file_name: "team-photo.jpg", file_type: "image/jpeg", file_size: 890000, url: "", alt_text: "Team photo 2026" },
];

function formatSize(bytes: number): string {
  if (bytes > 1000000) return `${(bytes / 1000000).toFixed(1)} MB`;
  return `${(bytes / 1000).toFixed(0)} KB`;
}

export default function AdminMedia() {
  const [media] = useState(mockMedia);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadMedia(formData);
    if (result.success) {
      toast.success("File uploaded");
    } else {
      toast.error(result.error || "Upload failed");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="text-sm text-white/40 mt-1">{media.length} files uploaded</p>
        </div>
        <div>
          <input type="file" id="file-upload" className="hidden" onChange={handleUpload} />
          <label htmlFor="file-upload">
            <Button asChild><Plus size={14} className="mr-1" /> Upload File</Button>
          </label>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-white">Files</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map(item => (
              <div key={item.id} className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <div className="w-full h-32 rounded-lg bg-white/[0.03] flex items-center justify-center mb-3">
                  <ImageIcon size={24} className="text-white/20" />
                </div>
                <p className="text-sm text-white/70 truncate" title={item.file_name}>{item.file_name}</p>
                <p className="text-xs text-white/30 mt-1">{formatSize(item.file_size)}</p>
                {item.alt_text && <p className="text-xs text-white/20 mt-1 truncate">ALT: {item.alt_text}</p>}
                <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-7 w-7"><Download size={12} /></Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7"><Trash2 size={12} className="text-red-400" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
