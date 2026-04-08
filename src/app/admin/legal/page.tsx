"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

const defaultLegal = {
  privacy: {
    title: "Privacy Policy",
    content: `# Privacy Policy\n\nLast updated: January 2026\n\n## 1. Information We Collect\n\nWe collect information you provide directly, such as your name, email address, and company when you fill out forms on our website.\n\n## 2. How We Use Information\n\nWe use the information we collect to provide, maintain, and improve our services.\n\n## 3. Information Sharing\n\nWe do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.\n\n## 4. Data Security\n\nWe implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.\n\n## 5. Your Rights\n\nYou have the right to access, correct, or delete your personal data.\n\n## 6. Contact\n\nFor questions about this policy, please contact us at hello@aetheria.app.`,
  },
  terms: {
    title: "Terms of Service",
    content: `# Terms of Service\n\nLast updated: January 2026\n\n## 1. Acceptance of Terms\n\nBy accessing and using the Aetheria website, you accept and agree to be bound by these Terms of Service.\n\n## 2. Use of Services\n\nOur digital services are provided on an "as is" basis.\n\n## 3. Intellectual Property\n\nAll content, design, and intellectual property on this website is owned by Aetheria.\n\n## 4. Limitation of Liability\n\nIn no event shall Aetheria be liable for any indirect, incidental, special, consequential, or punitive damages.\n\n## 5. Contact\n\nFor questions about these terms, contact us at hello@aetheria.app.`,
  },
  cookies: {
    title: "Cookie Policy",
    content: `# Cookie Policy\n\nLast updated: January 2026\n\n## 1. What Are Cookies\n\nCookies are small data files stored on your device when you visit our website.\n\n## 2. Cookies We Use\n\n- Essential Cookies: Required for site functionality.\n- Analytics Cookies: Help us understand how visitors use our site.\n- Marketing Cookies: Used to deliver relevant advertisements.\n\n## 3. Managing Cookies\n\nYou can control cookies through your browser settings.`,
  },
};

export default function AdminLegal() {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms" | "cookies">("privacy");
  const [content, setContent] = useState(defaultLegal);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} updated`);
    setTimeout(() => setSaving(false), 800);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Legal Pages</h1>
          <p className="text-sm text-white/40 mt-1">Manage legal pages content.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
          Save
        </Button>
      </div>

      <div className="flex gap-2">
        {(["privacy", "terms", "cookies"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              activeTab === tab ? "bg-violet-500/20 text-violet-300" : "bg-white/5 text-white/40 hover:text-white/60"
            }`}
          >
            {tab === "privacy" ? "Privacy Policy" : tab === "terms" ? "Terms of Service" : "Cookie Policy"}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-white">{content[activeTab].title}</CardTitle></CardHeader>
        <CardContent>
          <textarea
            value={content[activeTab].content}
            onChange={e => setContent({ ...content, [activeTab]: { ...content[activeTab], content: e.target.value } })}
            rows={24}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-violet-500/50 resize-none leading-relaxed"
          />
          <p className="text-xs text-white/20 mt-3">Supports Markdown. Use # for headings, ## for subheadings, - for lists.</p>
        </CardContent>
      </Card>
    </div>
  );
}
