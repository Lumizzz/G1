"use client";

import { ContentTable } from "@/components/admin/content/content-table";

export default function AdminFeatures() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Features</h1>
        <p className="text-sm text-white/40 mt-1">Manage the features shown on the homepage and features page.</p>
      </div>
      <ContentTable
        tableName="features"
        title="Features"
        columns={[
          { key: "icon", label: "Icon" },
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          { key: "display_order", label: "Order" },
        ]}
        extraFields={[
          { key: "icon", label: "Icon Name", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "text" },
        ]}
      />
    </div>
  );
}
