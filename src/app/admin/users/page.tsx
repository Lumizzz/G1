"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Mail } from "lucide-react";
import { toast } from "sonner";

const mockUsers = [
  { id: 1, name: "Admin User", email: "admin@aetheria.app", role: "super_admin", last_seen: "Just now" },
  { id: 2, name: "Editor User", email: "editor@aetheria.app", role: "editor", last_seen: "2 hours ago" },
];

const roleLabels: Record<string, string[]> = {
  super_admin: ["Super Admin", "Full access"],
  admin: ["Admin", "Manage content and users"],
  editor: ["Editor", "Manage content only"],
  viewer: ["Viewer", "Read-only access"],
};

export default function AdminUsers() {
  const [users] = useState(mockUsers);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = () => {
    if (!inviteEmail) return;
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setShowInvite(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-sm text-white/40 mt-1">{users.length} users</p>
        </div>
        <Button onClick={() => setShowInvite(true)}><Plus size={14} className="mr-1" /> Invite User</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Name</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Email</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Role</th>
                <th className="text-left py-3 px-6 text-xs font-medium text-white/30 uppercase">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-500/30 flex items-center justify-center text-xs font-medium text-white">
                        {user.name[0]}
                      </div>
                      <span className="text-sm text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-white/50">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 rounded-full text-xs font-medium border bg-violet-500/10 text-violet-300 border-violet-500/20">
                      {roleLabels[user.role]?.[0] || user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-white/30">{user.last_seen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="w-full max-w-md bg-[#12121a] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-medium text-white mb-6">Invite User</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60 mb-2 block">Email Address</label>
                <Input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="user@company.com" className="bg-white/5" />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-2 block">Role</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50">
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="secondary" onClick={() => setShowInvite(false)}>Cancel</Button>
                <Button onClick={handleInvite}>Send Invite</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
