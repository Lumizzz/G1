"use client";

import { ContentTable } from "@/components/admin/content/content-table";

export default function AdminPricing() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Pricing Plans</h1>
        <p className="text-sm text-white/40 mt-1">Manage pricing plans shown on the pricing page.</p>
      </div>
      <ContentTable
        tableName="pricing_plans"
        title="Pricing Plans"
        columns={[
          { key: "name", label: "Plan" },
          { key: "price", label: "Price" },
          { key: "period", label: "Period" },
          { key: "is_popular", label: "Popular" },
        ]}
        extraFields={[
          { key: "name", label: "Plan Name", type: "text" },
          { key: "description", label: "Description", type: "text" },
          { key: "price", label: "Price", type: "text" },
          { key: "period", label: "Period (e.g. /month)", type: "text" },
          { key: "cta_text", label: "CTA Text", type: "text" },
          { key: "cta_link", label: "CTA Link", type: "text" },
        ]}
      />
    </div>
  );
}
