import { AdminSidebar } from "@/components/admin/sidebar/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-40 h-16 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 px-8 flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/60">Admin Dashboard</span>
          </div>
        </div>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
