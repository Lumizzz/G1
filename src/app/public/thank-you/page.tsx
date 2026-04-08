import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={36} className="text-green-400" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Message Sent</h1>
        <p className="text-white/40 text-lg mb-10">
          Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/public" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-[0_0_25px_rgba(124,58,237,0.3)] transition-all">
            Back to Home
            <ArrowRight size={16} />
          </Link>
          <Link href="/public/case-studies" className="inline-flex items-center gap-2 px-6 py-3 text-white/50 border border-white/10 rounded-xl hover:bg-white/5 hover:text-white transition-all">
            View Our Work
          </Link>
        </div>
      </div>
    </div>
  );
}
