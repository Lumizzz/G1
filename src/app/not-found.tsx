import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">404</p>
        <h1 className="text-2xl md:text-3xl font-semibold text-white mt-6">Page not found</h1>
        <p className="text-white/40 mt-3 max-w-md mx-auto">
          The page you're looking for has moved or doesn't exist. Let's get you back on track.
        </p>
        <Link
          href="/public"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={16} />
          Back Home
        </Link>
      </div>
    </div>
  );
}
