'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import EnquiryForm from './EnquiryForm.jsx';

export default function EnquiryModal({ title, onClose }) {
  const card = useRef(null);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(card.current, { y: 30, opacity: 0, scale: .98 }, { y: 0, opacity: 1, scale: 1, duration: .55, ease: 'power3.out' });
    return () => { document.body.style.overflow = ''; };
  }, []);
  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
      <div onClick={onClose} className="absolute inset-0 bg-olive-night/60 backdrop-blur-sm" />
      <div ref={card} className="relative grid max-h-[calc(100vh-24px)] w-full max-w-[880px] overflow-auto bg-ivory shadow-2xl md:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-[180px] md:min-h-[520px]">
          <img src="/img/w/villa-facade.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-olive-night/85 to-olive-night/10" />
          <div className="absolute inset-x-6 bottom-6 flex flex-col gap-2 text-ivory">
            <img src="/img/logo-westwinds.png" alt="West Winds" className="w-44" />
            <p className="text-[11px] uppercase tracking-[.24em] text-stone">₹2.10 Cr onwards · Possession Dec 2026</p>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-6 sm:p-10">
          <div>
            <p className="text-[11px] uppercase tracking-[.26em] text-olive">Priority access · Phase 1</p>
            <h2 className="mt-2 font-serif text-[clamp(30px,3vw,40px)] leading-none">{title}</h2>
          </div>
          <EnquiryForm />
        </div>
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-xl text-olive-deep shadow">×</button>
      </div>
    </div>
  );
}
