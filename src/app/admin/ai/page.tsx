"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getAiConfig, updateAiConfig } from "@/actions/ai";
import { askAdminAssistant } from "@/actions/ai";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AdminAI() {
  const [visitorPrompt, setVisitorPrompt] = useState("");
  const [adminPrompt, setAdminPrompt] = useState("");
  const [model, setModel] = useState("gpt-4o");
  const [saving, setSaving] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const vp = await getAiConfig("visitor_system_prompt");
    const ap = await getAiConfig("admin_system_prompt");
    if (vp?.prompt) setVisitorPrompt(vp.prompt);
    if (ap?.prompt) setAdminPrompt(ap.prompt);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const r1 = await updateAiConfig("visitor_system_prompt", { prompt: visitorPrompt });
    const r2 = await updateAiConfig("admin_system_prompt", { prompt: adminPrompt });
    if (r1.success && r2.success) toast.success("AI settings saved");
    else toast.error("Failed to save");
    setSaving(false);
  };

  const handleChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim();
    setChatInput("");
    setChatHistory(prev => [...prev, { role: "user", content: msg }]);
    setChatLoading(true);

    const result = await askAdminAssistant(msg, chatHistory);
    if (result.reply) {
      setChatHistory(prev => [...prev, { role: "assistant", content: result.reply }]);
    }
    setChatLoading(false);
  };

  if (loading) return <p className="text-white/40">Loading...</p>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Settings</h1>
          <p className="text-sm text-white/40 mt-1">Configure AI behavior for visitors and admin assistant.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor AI Config */}
        <Card>
          <CardHeader><CardTitle className="text-white">Visitor AI Assistant</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">System Prompt</label>
              <textarea
                value={visitorPrompt}
                onChange={e => setVisitorPrompt(e.target.value)}
                rows={6}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 resize-none"
                placeholder="You are a helpful AI assistant for Aetheria..."
              />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Model</label>
              <Input value={model} onChange={e => setModel(e.target.value)} className="bg-white/5 font-mono text-xs" />
            </div>
          </CardContent>
        </Card>

        {/* Admin AI Config */}
        <Card>
          <CardHeader><CardTitle className="text-white">Admin AI Assistant</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <div>
              <label className="text-sm text-white/60 mb-2 block">System Prompt</label>
              <textarea
                value={adminPrompt}
                onChange={e => setAdminPrompt(e.target.value)}
                rows={6}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 resize-none"
                placeholder="You are an AI writing and strategy assistant..."
              />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Model</label>
              <Input value={model} onChange={e => setModel(e.target.value)} className="bg-white/5 font-mono text-xs" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin AI Chat */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles size={18} className="text-violet-400" />
            Admin AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 overflow-y-auto space-y-3 mb-4 p-4 rounded-lg bg-white/[0.02] border border-white/5">
            {chatHistory.length === 0 && <p className="text-sm text-white/30 text-center py-8">Ask the AI assistant anything — generate copy, brainstorm ideas, improve marketing text.</p>}
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${msg.role === "user" ? "bg-violet-600/90 text-white" : "bg-white/5 text-white/80 border border-white/5"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {chatLoading && <p className="text-sm text-white/30 animate-pulse">Thinking...</p>}
          </div>
          <div className="flex gap-3">
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleChat()}
              placeholder="Ask the AI assistant..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50"
            />
            <Button onClick={handleChat} disabled={chatLoading || !chatInput.trim()}>Send</Button>
          </div>
          <div className="flex gap-2 mt-3">
            {["Improve this copy", "Write a blog outline", "Generate a FAQ", "Suggest SEO title"].map(prompt => (
              <button key={prompt} onClick={() => setChatInput(prompt)} className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white/60 hover:border-white/20 transition-colors">
                {prompt}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
