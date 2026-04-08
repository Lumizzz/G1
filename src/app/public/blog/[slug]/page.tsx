import { getBlogPostBySlug, getPublishedBlogPosts } from "@/actions/cms";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface Params { slug: string }

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts?.map((p: any) => ({ slug: p.slug })) || [
    { slug: "future-of-digital-intelligence" },
    { slug: "design-systems-that-scale" },
    { slug: "performance-as-a-feature" },
  ];
}

const defaultPosts: Record<string, { title: string; content: string; excerpt: string; date: string }> = {
  "future-of-digital-intelligence": {
    title: "The Future of Digital Intelligence",
    excerpt: "How AI is reshaping digital experiences from static pages to dynamic, adaptive environments.",
    date: "March 15, 2026",
    content: `The digital landscape is undergoing its most significant transformation in two decades. What was once static, template-driven web design is rapidly evolving into intelligent, adaptive experiences that respond to each visitor in real time.\n\n## The Shift from Static to Dynamic\n\nFor years, websites were essentially digital brochures — beautifully designed, but fundamentally one-size-fits-all. Every visitor saw the same content, the same layout, the same calls to action.\n\nToday's most effective digital products are different. They learn. They adapt. They anticipate.\n\n## What This Means for Businesses\n\nThe companies winning in this environment share a common approach: they treat their digital presence as a living system, not a static asset. This means:\n\n- **Intelligent personalization** — Content that adapts based on visitor behavior and context\n- **Predictive UX** — Interfaces that anticipate user intent and reduce friction before it happens\n- **Conversational interfaces** — AI assistants that guide, inform, and convert visitors naturally\n- **Data-driven iteration** — Every interaction becomes fuel for the next improvement\n\n## The Aetheria Approach\n\nAt Aetheria, we've built this intelligence into our platform from the ground up. Every project we deliver includes:\n\n1. A content management system that makes updates effortless\n2. Analytics that surface actionable insights, not just vanity metrics\n3. AI integration that enhances rather than replaces the human experience\n4. An architecture designed to evolve with your business\n\nThe future of digital isn't about more features. It's about smarter ones.`,
  },
  "design-systems-that-scale": {
    title: "Design Systems That Actually Scale",
    excerpt: "Lessons from building design systems used by 200+ components across 15 products.",
    date: "February 28, 2026",
    content: `A design system that works at scale is fundamentally different from a style guide. It's not about colors and fonts — it's about creating a shared language between design and engineering that compounds in value over time.\n\n## The Foundation\n\nEvery effective design system starts with tokens. Not tokens as in Figma styles, but tokens as a deliberate, versioned system that maps directly to code.\n\nOur approach:\n- Define the atomic properties (colors, spacing, typography scale)\n- Map them to semantic aliases (primary, surface, text-body)\n- Apply them through component-specific variables\n\n## Component Architecture\n\nThe biggest mistake we see teams make is building components before defining composition rules. A button isn't just a button — it's a primitive that participates in forms, toolbars, dialogs, and navigation.\n\n## Governance\n\nThe hardest part isn't building the system. It's maintaining it. Our governance model includes:\n- A design engineering review for every new component\n- Regular audits of component usage\n- Clear deprecation timelines\n\nThe result is a system that grows stronger with use, not more chaotic.`,
  },
  "performance-as-a-feature": {
    title: "Performance as a Feature, Not an Afterthought",
    excerpt: "Why the fastest websites convert better and how to achieve sub-second load times.",
    date: "February 10, 2026",
    content: `Speed isn't a nice-to-have optimization. It's a core product feature that directly impacts revenue.\n\n## The Data\n\nEvery 100ms improvement in page load time translates to a 1% increase in revenue for e-commerce sites. For content sites, each additional second of load time reduces conversions by up to 7%.\n\n## Where Speed Comes From\n\nFast websites aren't accidents. They're the result of deliberate architectural decisions:\n\n1. **Server-side rendering** — Ship HTML, not a loading spinner\n2. **Image optimization** — AVIF/WebP with responsive sizing\n3. **Font optimization** — Variable fonts with proper font-display strategy\n4. **Code splitting** — Only ship what each page actually needs\n5. **CDN strategy** — Edge caching with smart invalidation\n\n## The Aetheria Standard\n\nEvery project we ship meets these benchmarks:\n- First Contentful Paint: under 1.0s\n- Largest Contentful Paint: under 2.0s\n- Cumulative Layout Shift: under 0.1\n- Time to Interactive: under 3.0s\n\nIf you're not measuring, you're guessing. And the market punishes guessing.`,
  },
};

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await getBlogPostBySlug(params.slug);

  const defaults = defaultPosts[params.slug];
  if (!post && !defaults) notFound();

  const title = post?.title || defaults?.title || "Blog Post";
  const content = post?.content || defaults?.content || "";
  const date = post?.published_at || defaults?.date || "";
  const authorName = post?.profiles?.full_name || "Aetheria Team";

  return (
    <div className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/public/blog" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <p className="text-sm text-violet-400 mb-4">{date}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">{title}</h1>

        {post?.cover_image_url && (
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img src={post.cover_image_url} alt={title} className="w-full h-64 object-cover" />
          </div>
        )}

        <div className="text-white/50 leading-relaxed space-y-6">
          {content.split("\n\n").map((paragraph: string, i: number) => {
            if (paragraph.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{paragraph.slice(3)}</h2>;
            if (paragraph.startsWith("- **")) {
              const items = paragraph.split("\n").filter(l => l.startsWith("- "));
              return (
                <ul key={i} className="space-y-2 my-4">
                  {items.map((item: string, j: number) => <li key={j} className="text-white/50">{item.replace(/^- /, "")}</li>)}
                </ul>
              );
            }
            if (/^\d+\.\s/.test(paragraph)) {
              const lines = paragraph.split("\n");
              return lines.map((line: string, j: number) => <p key={j} className="ml-4">{line}</p>);
            }
            return <p key={i} className="leading-relaxed">{paragraph}</p>;
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-sm text-white/30">Written by {authorName}</p>
        </div>
      </div>
    </div>
  );
}
