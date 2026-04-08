"use client";

import { ContentTable } from "@/components/admin/content/content-table";

export default function AdminServices() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Services</h1>
        <p className="text-sm text-white/40 mt-1">Manage the services shown on the services page.</p>
      </div>
      <ContentTable
        tableName="services"
        title="Services"
        columns={[
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          { key: "display_order", label: "Order" },
        ]}
        extraFields={[
          { key: "icon", label: "Icon Name", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "text" },
          { key: "details", label: "Details", type: "text" },
          { key: "link", label: "Link", type: "text" },
        ]}
      />
    </div>
  );
}
