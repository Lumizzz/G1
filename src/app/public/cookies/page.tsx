import { getLegalPage } from "@/actions/legal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CookiesPage() {
  const data = await getLegalPage("cookies");
  const defaultContent = `# Cookie Policy\n\nLast updated: January 2026\n\n## 1. What Are Cookies\n\nCookies are small data files stored on your device when you visit our website.\n\n## 2. Cookies We Use\n\n- **Essential Cookies:** Required for site functionality.\n- **Analytics Cookies:** Help us understand how visitors use our site.\n- **Marketing Cookies:** Used to deliver relevant advertisements.\n\n## 3. Managing Cookies\n\nYou can control cookies through your browser settings. Disabling cookies may affect site functionality.\n\n## 4. Third-Party Cookies\n\nWe use third-party services (e.g., Google Analytics) that may set their own cookies.\n\n## 5. Contact\n\nFor questions about our cookie policy, contact us at hello@aetheria.app.`;
  const content = data?.content || defaultContent;

  return (
    <div className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/public" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-12">{data?.title || "Cookie Policy"}</h1>
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
