import Link from "next/link";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "future-of-digital-intelligence",
    title: "The Future of Digital Intelligence",
    excerpt: "How AI is reshaping digital experiences from static pages to dynamic, adaptive environments.",
    date: "March 15, 2026",
    category: "Strategy",
  },
  {
    slug: "design-systems-that-scale",
    title: "Design Systems That Actually Scale",
    excerpt: "Lessons from building design systems used by 200+ components across 15 products.",
    date: "February 28, 2026",
    category: "Design",
  },
  {
    slug: "performance-as-a-feature",
    title: "Performance as a Feature, Not an Afterthought",
    excerpt: "Why the fastest websites convert better and how to achieve sub-second load times.",
    date: "February 10, 2026",
    category: "Engineering",
  },
];

export default function BlogPage() {
  return (
    <div className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-sm font-medium text-violet-400 mb-4">Blog & Insights</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Thoughts on building better digital products.</h1>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/public/blog/${post.slug}`}
              className="block group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300">{post.category}</span>
                <span className="text-xs text-white/30">{post.date}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">{post.title}</h3>
              <p className="text-sm text-white/40 mb-4">{post.excerpt}</p>
              <span className="text-sm text-violet-400 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Read More <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
