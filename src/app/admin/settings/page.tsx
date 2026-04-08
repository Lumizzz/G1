"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateSiteSetting, getSiteSetting } from "@/actions/settings";

interface BrandSettings {
  name: string;
  tagline: string;
  logo_url: string;
  favicon_url: string;
  accent_color: string;
}

interface ContactSettings {
  email: string;
  phone: string;
  address: string;
  social: { twitter: string; linkedin: string; github: string };
}

export default function AdminSettings() {
  const [brand, setBrand] = useState<BrandSettings>({
    name: "Aetheria",
    tagline: "Intelligent Digital Experiences",
    logo_url: "",
    favicon_url: "",
    accent_color: "#7C3AED",
  });
  const [contact, setContact] = useState<ContactSettings>({
    email: "hello@aetheria.app",
    phone: "+1 (555) 000-0000",
    address: "San Francisco, CA",
    social: { twitter: "", linkedin: "", github: "" },
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const brandData = await getSiteSetting("brand");
    const contactData = await getSiteSetting("contact");
    if (brandData) setBrand(brandData as BrandSettings);
    if (contactData) setContact(contactData as ContactSettings);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const brandResult = await updateSiteSetting("brand", brand as any);
    const contactResult = await updateSiteSetting("contact", contact as any);
    if (brandResult.success && contactResult.success) {
      toast.success("Settings saved");
    } else {
      toast.error("Failed to save settings");
    }
    setSaving(false);
  };

  if (loading) return <p className="text-white/40">Loading...</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-sm text-white/40 mt-1">Configure your site's global settings.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
          Save Changes
        </Button>
      </div>

      {/* Brand */}
      <Card>
        <CardHeader><CardTitle className="text-white">Brand</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Site Name</label>
              <Input value={brand.name} onChange={e => setBrand({ ...brand, name: e.target.value })} className="bg-white/5" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Tagline</label>
              <Input value={brand.tagline} onChange={e => setBrand({ ...brand, tagline: e.target.value })} className="bg-white/5" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Logo URL</label>
              <Input value={brand.logo_url} onChange={e => setBrand({ ...brand, logo_url: e.target.value })} placeholder="https://..." className="bg-white/5 font-mono text-xs" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Favicon URL</label>
              <Input value={brand.favicon_url} onChange={e => setBrand({ ...brand, favicon_url: e.target.value })} placeholder="https://..." className="bg-white/5 font-mono text-xs" />
            </div>
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Accent Color</label>
            <div className="flex gap-3">
              <Input type="color" value={brand.accent_color} onChange={e => setBrand({ ...brand, accent_color: e.target.value })} className="w-16 bg-white/5 p-1 h-11" />
              <Input value={brand.accent_color} onChange={e => setBrand({ ...brand, accent_color: e.target.value })} className="bg-white/5 font-mono text-xs" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader><CardTitle className="text-white">Contact Information</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Email</label>
              <Input value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} className="bg-white/5" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Phone</label>
              <Input value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} className="bg-white/5" />
            </div>
          </div>
          <div>
            <label className="text-sm text-white/60 mb-2 block">Address</label>
            <Input value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })} className="bg-white/5" />
          </div>
          <div className="space-y-4">
            <label className="text-sm text-white/60">Social Links</label>
            <div className="grid grid-cols-3 gap-5">
              <div>
                <label className="text-xs text-white/30 mb-1 block">Twitter</label>
                <Input placeholder="@username" value={contact.social.twitter} onChange={e => setContact({ ...contact, social: { ...contact.social, twitter: e.target.value } })} className="bg-white/5 font-mono text-xs" />
              </div>
              <div>
                <label className="text-xs text-white/30 mb-1 block">LinkedIn</label>
                <Input placeholder="linkedin.com/company/..." value={contact.social.linkedin} onChange={e => setContact({ ...contact, social: { ...contact.social, linkedin: e.target.value } })} className="bg-white/5 font-mono text-xs" />
              </div>
              <div>
                <label className="text-xs text-white/30 mb-1 block">GitHub</label>
                <Input placeholder="github.com/..." value={contact.social.github} onChange={e => setContact({ ...contact, social: { ...contact.social, github: e.target.value } })} className="bg-white/5 font-mono text-xs" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
