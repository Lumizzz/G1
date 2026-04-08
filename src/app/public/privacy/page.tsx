import { getLegalPage } from "@/actions/legal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function PrivacyPage() {
  const data = await getLegalPage("privacy");

  const defaultContent = `# Privacy Policy

Last updated: January 2026

## 1. Information We Collect

We collect information you provide directly, such as your name, email address, and company when you fill out forms on our website.

## 2. How We Use Information

We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to process your requests.

## 3. Information Sharing

We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent.

## 4. Data Security

We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.

## 5. Your Rights

You have the right to access, correct, or delete your personal data. Contact us to exercise these rights.

## 6. Contact

For questions about this policy, please contact us at hello@aetheria.app.`;

  const content = data?.content || defaultContent;

  return (
    <div className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/public" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-12 transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-12">{data?.title || "Privacy Policy"}</h1>
        <div className="prose prose-invert prose-sm max-w-none text-white/50 leading-relaxed">
          {content.split("\n").map((line, i) => {
            if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h1>;
            if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-semibold text-white mt-8 mb-3">{line.slice(3)}</h2>;
            if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-medium text-white mt-6 mb-2">{line.slice(4)}</h3>;
            if (line.trim() === "") return <br key={i} />;
            return <p key={i} className="mb-2">{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
