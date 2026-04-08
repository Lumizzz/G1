"use client";
import { ContentTable } from "@/components/admin/content/content-table";
export default function AdminSections() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Sections</h1>
        <p className="text-sm text-white/40 mt-1">Manage homepage sections.</p>
      </div>
      <ContentTable
        tableName="sections"
        title="Sections"
        columns={[
          { key: "key", label: "Key" },
          { key: "title", label: "Title" },
          { key: "is_visible", label: "Visible" },
          { key: "display_order", label: "Order" },
        ]}
        extraFields={[
          { key: "key", label: "Section Key", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "subtitle", label: "Subtitle", type: "text" },
        ]}
      />
    </div>
  );
}
