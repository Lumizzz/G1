"use client";
import { ContentTable } from "@/components/admin/content/content-table";
export default function AdminNavigation() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Navigation</h1>
        <p className="text-sm text-white/40 mt-1">Manage the main navigation menu.</p>
      </div>
      <ContentTable
        tableName="navigation"
        title="Navigation"
        columns={[
          { key: "label", label: "Label" },
          { key: "href", label: "Link" },
          { key: "is_external", label: "External" },
          { key: "display_order", label: "Order" },
        ]}
        extraFields={[
          { key: "label", label: "Menu Label", type: "text" },
          { key: "href", label: "URL", type: "text" },
          { key: "parent_id", label: "Parent Item", type: "number" },
        ]}
      />
    </div>
  );
}
