"use client";

import { ContentTable } from "@/components/admin/content/content-table";

export default function AdminFooter() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Footer</h1>
        <p className="text-sm text-white/40 mt-1">Manage footer sections.</p>
      </div>
      <ContentTable
        tableName="footer"
        title="Footer Content"
        columns={[
          { key: "key", label: "Section" },
          { key: "display_order", label: "Order" },
        ]}
        extraFields={[
          { key: "key", label: "Section Key", type: "text" },
          { key: "content", label: "Content (JSON)", type: "textarea" },
        ]}
      />
    </div>
  );
}
