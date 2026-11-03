'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useUI } from './UIProvider.jsx';
import { NAV } from './nav.js';

export default function Header() {
  const { openEnquiry } = useUI();
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    let last = 0;
    const onScroll = () => { const y = window.scrollY; setHidden(prev => (y > 400 && y > last + 2) ? true : (y < last - 2 ? false : prev)); last = y; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    if (menu) {
      gsap.fromTo('[data-mm]', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: .7, ease: 'expo.out' });
      gsap.fromTo('[data-mm-i]', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .05, delay: .15, ease: 'power3.out' });
    }
  }, [menu]);

  const dark = menu;
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[60] flex h-20 items-center justify-between gap-5 border-b px-4 backdrop-blur-md transition-[transform,background-color] duration-500 ease-lux sm:px-8 lg:h-[88px] lg:px-14 ${dark ? 'border-ivory/10 bg-olive-deep' : 'border-olive-deep/10 bg-ivory/95'} ${hidden && !menu ? '-translate-y-full' : 'translate-y-0'}`}>
        <Link href="/" aria-label="West Winds home" className="block w-[150px] shrink-0 lg:w-[190px]">
          <img src={dark ? '/img/logo-westwinds.png' : '/img/logo-westwinds-dark.png'} alt="West Winds — Villas in Harmony with Nature" className="block w-full" />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[clamp(14px,2vw,30px)] xl:flex">
          {NAV.map(([label, to]) => (
            <Link key={to} href={to} className={((isActive) => `whitespace-nowrap text-[13px] uppercase tracking-[.2em] transition-colors hover:text-olive ${isActive && !to.includes('#') ? 'text-olive underline underline-offset-8' : 'text-olive-deep'}`)false}>{label}</Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2.5">
          <button onClick={() => openEnquiry()} className={`inline-flex h-11 items-center whitespace-nowrap rounded-full px-5 text-xs uppercase tracking-[.2em] transition-colors sm:h-[52px] sm:px-7 sm:text-sm ${dark ? 'bg-ivory text-olive-deep' : 'bg-olive text-ivory hover:bg-olive-deep'}`}>Enquire now</button>
          <button onClick={() => setMenu(m => !m)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}
            className={`flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border xl:hidden ${dark ? 'border-ivory/40' : 'border-olive-deep/25'}`}>
            <span className={`h-[1.5px] w-[18px] transition-transform duration-400 ${dark ? 'bg-ivory translate-y-[3.25px] rotate-45' : 'bg-olive-deep'}`} />
            <span className={`h-[1.5px] w-[18px] transition-transform duration-400 ${dark ? 'bg-ivory -translate-y-[3.25px] -rotate-45' : 'bg-olive-deep'}`} />
          </button>
        </div>
      </header>

      {menu && (
        <div data-mm className="fixed inset-0 z-[58] flex flex-col overflow-auto bg-olive-deep px-5 pb-6 pt-[88px] text-ivory sm:px-12">
          <div data-mm-i className="flex justify-between border-b border-ivory/15 pb-3.5 text-[11px] uppercase tracking-label text-[#a3a490]"><span>Menu</span><span>West Winds · Bhanur</span></div>
          <nav aria-label="Mobile" className="grid gap-x-8 sm:grid-cols-2">
            {[['Home', '#top'], ...NAV].map(([label, to], i) => (
              <Link data-mm-i key={to} href={to} onClick={() => setMenu(false)} className="grid grid-cols-[40px_1fr_20px] items-baseline gap-2.5 border-b border-ivory/10 py-[clamp(14px,2.4vh,20px)] hover:text-stone">
                <span className="text-[11px] tracking-[.2em] text-faint">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-serif text-[clamp(30px,6vw,44px)] leading-none">{label}</span>
                <span className="text-faint">→</span>
              </Link>
            ))}
          </nav>
          <div data-mm-i className="mt-auto grid items-center gap-3 pt-7 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 bg-olive px-5 py-4">
              <span className="text-[10px] uppercase tracking-[.26em] text-stone">Villas starting at</span>
              <span className="font-serif text-[32px] leading-none">₹2.10 Cr <span className="font-sans text-[11px] tracking-[.2em] text-stone">ONWARDS</span></span>
              <span className="text-xs text-ivory/70">3 &amp; 4 BHK + Media · HMDA &amp; RERA</span>
            </div>
            <button onClick={() => { setMenu(false); openEnquiry(); }} className="btn-light min-h-[56px] w-full">Enquire now</button>
          </div>
        </div>
      )}
    </>
  );
}
