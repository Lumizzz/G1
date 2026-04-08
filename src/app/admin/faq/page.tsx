"use client";
import { ContentTable } from "@/components/admin/content/content-table";
export default function AdminFaq() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">FAQ</h1>
        <p className="text-sm text-white/40 mt-1">Manage frequently asked questions.</p>
      </div>
      <ContentTable
        tableName="faqs"
        title="FAQs"
        columns={[
          { key: "question", label: "Question" },
          { key: "category", label: "Category" },
          { key: "display_order", label: "Order" },
        ]}
        extraFields={[
          { key: "question", label: "Question", type: "text" },
          { key: "answer", label: "Answer", type: "text" },
          { key: "category", label: "Category", type: "text" },
        ]}
      />
    </div>
  );
}
