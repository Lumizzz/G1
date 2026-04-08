import { FaqAccordion } from "@/components/public/faq/faq-accordion";
import { getFaqs } from "@/actions/cms";

export default async function FaqPage() {
  const faqs = await getFaqs();

  const defaultFaqs = [
    { question: "What technologies do you use?", answer: "We primarily use Next.js, TypeScript, Tailwind CSS, React Three Fiber for 3D, and Supabase for backend.", category: "General" },
    { question: "How long does a typical project take?", answer: "A standard premium website takes 6-12 weeks from kickoff to launch.", category: "Timeline" },
    { question: "Do you offer ongoing support?", answer: "Yes. We offer monthly retainers for ongoing development, optimization, and support after launch.", category: "Support" },
    { question: "Can I edit the content after launch?", answer: "Absolutely. Your CMS dashboard gives you full editing control over all content.", category: "CMS" },
    { question: "What about hosting and deployment?", answer: "We deploy to Vercel for frontend hosting and use Supabase for backend, database, and storage.", category: "Infrastructure" },
  ];

  const items = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <div className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-violet-400 mb-4">Support</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Frequently Asked Questions</h1>
        </div>
        <FaqAccordion items={items} />
      </div>
    </div>
  );
}
