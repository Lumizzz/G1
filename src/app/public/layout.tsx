import { SiteHeader } from "@/components/public/header/site-header";
import { SiteFooter } from "@/components/public/footer/site-footer";
import { VisitorAIWidget } from "@/components/public/ai-widget/visitor-ai-widget";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SiteHeader />
      <main className="pt-20">{children}</main>
      <SiteFooter />
      <VisitorAIWidget />
    </div>
  );
}
