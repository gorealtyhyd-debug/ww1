'use client';
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/**
 * Page-level scroll effects. Attach data attributes in markup:
 *  data-rv      fade/slide up on enter
 *  data-px      parallax image (inside an overflow-hidden parent)
 *  data-clipin  clip-path reveal
 *  data-count   count-up number (value = target)
 * Section h2s get a masked rise automatically.
 */
export default function useScrollFx(ref, deps = []) {
  useLayoutEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.utils.toArray('[data-rv]').forEach(el => gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));
      gsap.utils.toArray('section h2').forEach(el => gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)', y: 40 }, { clipPath: 'inset(0 0 -20% 0)', y: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
      gsap.utils.toArray('[data-px]').forEach(el => gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
      gsap.utils.toArray('[data-clipin]').forEach(el => gsap.fromTo(el, { clipPath: 'inset(18% 0% 0% 0%)', opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } }));
      gsap.utils.toArray('[data-count]').forEach(el => { const o = { v: 0 }, to = +el.dataset.count;
        gsap.to(o, { v: to, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('en-IN'); } }); });
    }, ref);
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { clearTimeout(t); ctx.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
