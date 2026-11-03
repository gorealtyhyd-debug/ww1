'use client';
import Link from 'next/link';
import { NAV } from './nav.js';

export default function Footer() {
  return (
    <footer className="bg-olive-night px-5 pb-10 pt-16 text-ivory/70 sm:px-8 lg:px-[72px]">
      <div className="mx-auto flex max-w-site flex-col gap-9">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <img src="/img/logo-westwinds.png" alt="West Winds" className="w-[220px]" />
          <div className="flex items-center gap-3.5"><span className="whitespace-nowrap text-[11px] uppercase tracking-[.2em]">A project by</span><img src="/img/logo-creativehomes.png" alt="Creative Homes" className="w-14" /></div>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3 text-[13px]">
          {[['Home', '#top'], ...NAV].map(([l, to]) => <Link key={to} href={to} className="text-ivory/80 hover:text-stone">{l}</Link>)}
        </nav>
        <div className="flex flex-wrap justify-between gap-5 border-t border-ivory/10 pt-6 text-xs leading-relaxed">
          <p>West Winds by Creative Homes · Sy. No. 353, Bhanur – Shankarpally, Hyderabad, Telangana · HMDA &amp; RERA approved</p>
          <p className="max-w-[620px]">Disclaimer: This website is meant only for information purposes. It should not be considered/ claimed as an official site. This website belongs to authorized channel partner.</p>
        </div>
      </div>
    </footer>
  );
}
