"use client";
import { ContentTable } from "@/components/admin/content/content-table";
export default function AdminTestimonials() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Testimonials</h1>
        <p className="text-sm text-white/40 mt-1">Manage client testimonials and reviews.</p>
      </div>
      <ContentTable
        tableName="testimonials"
        title="Testimonials"
        columns={[
          { key: "author_name", label: "Author" },
          { key: "company", label: "Company" },
          { key: "rating", label: "Rating" },
        ]}
        extraFields={[
          { key: "author_name", label: "Author Name", type: "text" },
          { key: "author_role", label: "Role", type: "text" },
          { key: "company", label: "Company", type: "text" },
          { key: "content", label: "Content", type: "text" },
          { key: "rating", label: "Rating (1-5)", type: "number" },
        ]}
      />
    </div>
  );
}
