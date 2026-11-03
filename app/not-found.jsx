import Link from 'next/link';
export const metadata = { title: 'Page not found | West Winds', robots: { index: false } };
export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-5 pt-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-serif text-[clamp(44px,6vw,88px)] leading-none">This page has <em className="italic">moved.</em></h1>
      <Link href="/" className="btn-dark">Back to West Winds</Link>
    </main>
  );
}
