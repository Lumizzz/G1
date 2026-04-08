"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminBranding() {
  const [branding, setBranding] = useState({
    logo_url: "",
    favicon_url: "",
    accent_color: "#7C3AED",
    accent_secondary: "#A78BFA",
    bg_from: "#0a0a0f",
    bg_to: "#1a0a2e",
    font_heading: "Inter",
    font_body: "Inter",
  });

  const handleSave = () => {
    toast.success("Branding saved");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Branding</h1>
          <p className="text-sm text-white/40 mt-1">Configure your brand colors, fonts, and logo.</p>
        </div>
        <Button onClick={handleSave}><Save size={16} className="mr-2" /> Save</Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-white">Visual Identity</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div>
            <label className="text-sm text-white/60 mb-2 block">Logo URL</label>
            <Input value={branding.logo_url} onChange={e => setBranding({ ...branding, logo_url: e.target.value })} placeholder="https://..." className="bg-white/5 font-mono text-xs" />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Favicon URL</label>
            <Input value={branding.favicon_url} onChange={e => setBranding({ ...branding, favicon_url: e.target.value })} placeholder="https://..." className="bg-white/5 font-mono text-xs" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-white">Colors</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {Object.entries({ accent_primary: "Accent Primary", accent_secondary: "Accent Secondary", bg_from: "Background From", bg_to: "Background To" }).map(([key, label]) => (
              <div key={key}>
                <label className="text-sm text-white/60 mb-2 block">{label}</label>
                <div className="flex gap-2">
                  <Input type="color" value={branding[key as keyof typeof branding]} onChange={e => setBranding({ ...branding, [key]: e.target.value })} className="w-16 bg-white/5 p-1 h-10" />
                  <Input value={branding[key as keyof typeof branding]} onChange={e => setBranding({ ...branding, [key]: e.target.value })} className="bg-white/5 font-mono text-xs" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-white">Typography</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Heading Font</label>
              <select value={branding.font_heading} onChange={e => setBranding({ ...branding, font_heading: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none">
                <option value="Inter">Inter</option>
                <option value="Geist">Geist</option>
                <option value="DM Sans">DM Sans</option>
                <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                <option value="Space Grotesk">Space Grotesk</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Body Font</label>
              <select value={branding.font_body} onChange={e => setBranding({ ...branding, font_body: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none">
                <option value="Inter">Inter</option>
                <option value="Geist">Geist</option>
                <option value="DM Sans">DM Sans</option>
                <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
