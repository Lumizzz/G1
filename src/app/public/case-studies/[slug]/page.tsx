import { getCaseStudyBySlug } from "@/actions/cms";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Users, DollarSign } from "lucide-react";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  return [
    { slug: "luminary-tech-rebrand" },
    { slug: "nova-ai-launch" },
    { slug: "greenline-ecommerce" },
    { slug: "meridian-health" },
  ];
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const caseStudy = await getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    const defaultStudies: Record<string, typeof caseStudy> = {
      "luminary-tech-rebrand": {
        id: 1,
        slug: "luminary-tech-rebrand",
        title: "Complete Platform Rebrand & Redesign",
        client: "Luminary Tech",
        industry: "SaaS",
        challenge: "Luminary Tech had built strong technology but their digital presence hadn't evolved with the product. The result was a growing gap between what they offered and how they were perceived. Our task was to close that gap completely.",
        solution: "We conducted a full brand audit, user interviews with 200+ existing customers, competitor analysis across 15 platforms, and then rebuilt every touchpoint — from the landing page to the product dashboard. The design system we created unified 200+ components under a single visual language.\n\nThe development phase involved migrating their legacy React app to Next.js with server-side rendering, implementing a component library with Storybook documentation, and rebuilding their marketing site as part of the same codebase.",
        results: { conversion: "+47%", users: "120K new signups in 90 days", revenue: "$3.2M ARR increase within 6 months" },
        testimony_quote: "Aetheria didn't just build our website — they elevated our entire brand. The result is something we're proud to show every single day.",
        cover_image_url: null,
        is_visible: true,
        meta_title: "Luminary Tech Rebrand | Aetheria Case Study",
        meta_description: "How we helped Luminary Tech increase conversion by 47% through a complete platform redesign.",
        created_at: "2025-06-15T00:00:00Z",
        updated_at: "2025-06-15T00:00:00Z",
      } as any,
    };
    const fallback = defaultStudies[params.slug] || null;
    if (!fallback) notFound();
    return <CaseStudyContent study={fallback} />;
  }

  return <CaseStudyContent study={caseStudy} />;
}

function CaseStudyContent({ study }: { study: any }) {
  return (
    <div className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/public/case-studies" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-12 transition-colors">
          <ArrowLeft size={16} />
          Back to Case Studies
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300">{study.industry}</span>
          <span className="text-sm text-white/30">{study.client}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">{study.title}</h1>

        {/* Results */}
        <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-12">
          <div>
            <p className="text-2xl font-bold text-white">{study.results?.conversion || "—"}</p>
            <p className="text-xs text-white/30">Conversion Lift</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{study.results?.users || "—"}</p>
            <p className="text-xs text-white/30">User Growth</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{study.results?.revenue || "—"}</p>
            <p className="text-xs text-white/30">Revenue Impact</p>
          </div>
        </div>

        {/* Challenge */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">The Challenge</h2>
          <p className="text-white/50 leading-relaxed">{study.challenge}</p>
        </div>

        {/* Solution */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Our Solution</h2>
          <div className="text-white/50 leading-relaxed whitespace-pre-line">{study.solution}</div>
        </div>

        {/* Testimonial */}
        {study.testimony_quote && (
          <div className="p-8 rounded-2xl bg-violet-500/5 border border-violet-500/10">
            <p className="text-lg text-white/70 italic mb-4">&ldquo;{study.testimony_quote}&rdquo;</p>
            <p className="text-sm text-white/40">— {study.client} Team</p>
          </div>
        )}
      </div>
    </div>
  );
}
