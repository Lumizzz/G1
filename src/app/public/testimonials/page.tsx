import { getTestimonials } from "@/actions/cms";
import { Star } from "lucide-react";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  const defaults = [
    { id: 1, author_name: "Sarah Chen", author_role: "CEO, Luminary Tech", content: "Aetheria didn't just build our website — they elevated our entire brand. The result is something we're proud to show every single day.", rating: 5 },
    { id: 2, author_name: "Marcus Rivera", author_role: "Head of Product, Nova AI", content: "The attention to detail, the motion design, the backend architecture — everything was handled with exceptional care and expertise.", rating: 5 },
    { id: 3, author_name: "Elena Vasquez", author_role: "Founder, Greenline", content: "Working with Aetheria felt like having a world-class CTO and creative director on our team from day one.", rating: 5 },
    { id: 4, author_name: "James Liu", author_role: "VP Engineering, DataFlow", content: "The performance improvements alone justified the investment. Page load times dropped 60% and our bounce rate followed.", rating: 5 },
    { id: 5, author_name: "Amara Osei", author_role: "CMO, BrightPath", content: "From the first call to launch day, Aetheria exceeded every expectation. Our conversion rate doubled within the first month.", rating: 5 },
    { id: 6, author_name: "David Park", author_role: "Founder, NexGen Labs", content: "The admin dashboard they built is genuinely a joy to use. Our non-technical team manages all content updates independently now.", rating: 5 },
  ];

  const items = testimonials && testimonials.length > 0 ? testimonials : defaults;

  return (
    <div className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-violet-400 mb-4">Testimonials</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">What our clients say</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t: any, i: number) => (
            <div key={t.id ?? i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                  <Star key={idx} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-8">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-500/30 flex items-center justify-center text-sm font-medium text-white">
                  {t.author_name[0]}
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{t.author_name}</p>
                  <p className="text-xs text-white/30">{t.author_role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
