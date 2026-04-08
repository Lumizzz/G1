import { getLegalPage } from "@/actions/legal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function TermsPage() {
  const data = await getLegalPage("terms");
  const defaultContent = `# Terms of Service\n\nLast updated: January 2026\n\n## 1. Acceptance of Terms\n\nBy accessing and using the Aetheria website, you accept and agree to be bound by these Terms of Service.\n\n## 2. Use of Services\n\nOur digital services are provided on an "as is" basis. We reserve the right to modify or discontinue services at any time.\n\n## 3. Intellectual Property\n\nAll content, design, and intellectual property on this website is owned by Aetheria and protected by applicable laws.\n\n## 4. Limitation of Liability\n\nIn no event shall Aetheria be liable for any indirect, incidental, special, consequential, or punitive damages.\n\n## 5. Governing Law\n\nThese terms shall be governed by the laws of the State of California.\n\n## 6. Contact\n\nFor questions about these terms, contact us at hello@aetheria.app.`;
  const content = data?.content || defaultContent;

  return (
    <div className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/public" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-12">{data?.title || "Terms of Service"}</h1>
        <div className="text-white/50 leading-relaxed">
          {content.split("\n").map((line, i) => {
            if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h1>;
            if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-semibold text-white mt-8 mb-3">{line.slice(3)}</h2>;
            if (!line.trim()) return <br key={i} />;
            return <p key={i} className="mb-2">{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
