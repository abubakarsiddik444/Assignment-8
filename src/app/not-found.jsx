import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-[#ded6c7] bg-[#fffdf7]/90 px-6 py-12 text-center shadow-sm">
      <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#1f6b4f]">404</span>
      <h1 className="mt-3 text-4xl font-bold text-[#1f2520]">Page not found</h1>
      <p className="mt-3 max-w-md text-[#647067]">The route you requested is not available in QurbaniHat.</p>
      <Link className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#1f6b4f] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5" href="/">
        Return Home
      </Link>
    </section>
  );
}
