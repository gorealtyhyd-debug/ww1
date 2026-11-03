'use client';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useUI } from '../components/UIProvider.jsx';
import useScrollFx, { gsap } from '../hooks/useScrollFx.js';
import useViewport from '../hooks/useViewport.js';
import SectionHead from '../components/SectionHead.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { IMG, PLANS, SIZES, VIEWS, MP, AMEN, SIG, PIL, FAQ_GROUPS, fp } from '../data.js';
import { PriceSection, WhyBhanur } from './Sections.jsx';

const ALL_FAQ = FAQ_GROUPS.flatMap(([, qs]) => qs);
import { MAP_URL } from '../components/nav.js';

const POOL_VIDEO = 'https://assets.mixkit.co/videos/3176/3176-720.mp4';
const MARQUEE = ['Gated community', 'HMDA & RERA approved', 'Free floor-plan customisation', 'Loans by LIC & others', 'Possession Dec 2026', 'Designed by architects', 'Embrace the change'];
const GLANCE = [
  ['Project', 'West Winds — Phase 1'], ['Developer', 'Creative Homes'], ['Location', 'Bhanur, near Shankarpalli, West Hyderabad'], ['Land area', '10 acres, gated'],
  ['Total villas', '136 luxury triplex villas'], ['Configuration', '3 BHK + Media · 4 BHK + Media'], ['Plot sizes', '170 – 300 sq.yds'], ['Built-up area', '2,550 – 4,500 sq.ft'],
  ['Facing', 'East & West'], ['Structure', 'Ground + 2 floors'], ['Price (BSP)', '₹2.10 Cr onwards'], ['Extra charges', 'GST, SD, mutation · Corpus & 2-yr FMS ₹5 L'],
  ['Approvals', 'HMDA · RERA'], ['Home loans', 'LIC & other lenders'], ['Possession', 'December 2026'], ['Est. ROI', '~60%+ by possession'],
];
const DRIVES = [[2, 'BDL'], [5, 'Shankarpalli'], [10, 'Mokila · Kollur ORR Exit 2'], [15, 'ORR Exit 3 · Patancheru'], [20, 'Kokapet · Neopolis'], [25, 'Gachibowli']];
const USPS = ['Designed & executed by architects', 'Conventional construction', 'Free floor-plan customisation'];
const CONFIGS = [
  { tag: 'Variant A', short: '3 BHK', t: '3 BHK + Media', img: 'w/living.jpg', d: 'Three bedrooms with attached baths across three private levels, a dedicated media room and an open terrace.', specs: [['Bedrooms', '3 + Media'], ['Levels', 'G + 2'], ['Facing', 'East / West']] },
  { tag: 'Variant B', short: '4 BHK', t: '4 BHK + Media', img: 'w/kitchen.jpg', d: 'Four bedrooms, generous living spaces and a dedicated media room on larger plots up to 300 sq.yds.', specs: [['Bedrooms', '4 + Media'], ['Plots up to', '300 sq.yds'], ['Built-up to', '4,500 sq.ft']] },
];
const GROUPS = [
  { t: 'Clubhouse', items: ['Clubhouse with indoor games', 'Library', 'Crèche', 'Cafeteria', 'Co-work space', 'Banquet hall', 'Suite rooms'], cls: 'bg-olive text-ivory', line: 'border-ivory/15' },
  { t: 'Leisure & wellness', items: ['Swimming pool', 'Gymnasium', 'Gazebos', 'BBQ corners', 'Party lawn', 'Central park', 'Open-air theatre', 'Wellness park'], cls: 'bg-ivory', line: 'border-line' },
  { t: 'Sports & play', items: ['Basketball court', 'Cricket net', 'Pickleball', 'Indoor badminton', 'Skating rink', 'Jogging track', 'Kids’ play area'], cls: 'bg-sand', line: 'border-line' },
  { t: 'Infrastructure', items: ['STP & WTP', '100% DG backup', 'Lush landscaping'], cls: 'bg-stone', line: 'border-[#c7bfa6]' },
];

export default function Home() {
  const root = useRef(null);
  const { openEnquiry, openLightbox } = useUI();
  const vw = useViewport();
  const [mp, setMp] = useState(0);
  const [sig, setSig] = useState(0);
  const [cfg, setCfg] = useState(0);
  const [ovTab, setOvTab] = useState(0);
  const [faq, setFaq] = useState(0);
  const [allFaq, setAllFaq] = useState(false);
  const [planSize, setPlanSize] = useState(170);
  const [planI, setPlanI] = useState(0);
  useScrollFx(root, [vw >= 1080]);

  useEffect(() => { const t = setInterval(() => setSig(s => (s + 1) % SIG.length), 6000); return () => clearInterval(t); }, [sig]);

  // Hero intro + pinned horizontal "Views" track
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-hero-img]', { scale: 1.12 }, { scale: 1, duration: 2.4, ease: 'power2.out' });
      gsap.from('[data-hl]', { yPercent: 110, duration: 1.4, stagger: .12, ease: 'expo.out', delay: .1 });
      gsap.from('[data-h]', { y: 30, opacity: 0, duration: 1.1, stagger: .09, ease: 'power3.out', delay: .4 });
      gsap.to('[data-hero-media]', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('[data-marquee]', { xPercent: -50, repeat: -1, duration: 40, ease: 'none' });
      if (vw >= 1080) {
        const track = document.querySelector('[data-htrack]');
        gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth), ease: 'none',
          scrollTrigger: { trigger: '[data-hpin]', start: 'top top', end: () => '+=' + (track.scrollWidth - window.innerWidth), pin: true, scrub: .6, invalidateOnRefresh: true,
            onUpdate: s => gsap.set('[data-hbar]', { scaleX: s.progress }) } });
      }
    }, root);
    return () => ctx.revert();
  }, [vw >= 1080]);

  const forSize = PLANS.filter(p => p.size === planSize);
  const plan = forSize.find(p => p.i === planI) || forSize[0];
  const m = MP[mp], s = SIG[sig], pil = PIL[ovTab];

  return (
    <main ref={root}>
      {/* HERO */}
      <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-olive-night text-ivory">
        <div data-hero-media className="absolute inset-0"><img data-hero-img src={IMG + 'w/gateway.jpg'} alt="West Winds gated entrance and clubhouse, Bhanur" className="h-full w-full object-cover object-[center_60%]" /></div>
        <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(30,31,25,.62)_0%,rgba(30,31,25,.35)_45%,rgba(30,31,25,.05)_75%),linear-gradient(0deg,rgba(30,31,25,.6)_0%,rgba(30,31,25,0)_30%)]" />
        <div className="wrap relative flex w-full flex-1 flex-col justify-center gap-6 pb-12 pt-[clamp(130px,20vh,210px)]">
          <p data-h className="flex items-center gap-3 text-[13px] uppercase tracking-[.42em]"><span className="h-px w-14 bg-ivory" />Creative Homes · Bhanur, Hyderabad</p>
          <h1 className="font-serif text-[clamp(52px,8vw,128px)] font-normal leading-[.98]">
            <span className="block overflow-hidden pb-[.05em]"><span data-hl className="block">Villas in</span></span>
            <span className="block overflow-hidden pb-[.07em]"><span data-hl className="block"><em className="italic">harmony</em> with</span></span>
            <span className="block overflow-hidden pb-[.05em]"><span data-hl className="block">nature.</span></span>
          </h1>
          <p data-h className="max-w-[760px] text-[clamp(17px,1.5vw,24px)] leading-relaxed text-ivory/90">West Winds by Creative Homes — 136 luxury triplex villas across 10 landscaped acres in Bhanur, each with a private media room.</p>
          <div data-h className="flex max-w-[760px] flex-wrap">
            <div className="flex flex-[1_1_300px] flex-col gap-2 bg-ivory px-7 py-6 text-olive-deep">
              <span className="text-xs uppercase tracking-label text-olive">Villas starting at</span>
              <span className="flex flex-wrap items-baseline gap-3.5"><span className="font-sans text-[clamp(46px,4.6vw,68px)] font-light leading-none">₹2.10 Cr</span><span className="text-[13px] uppercase tracking-[.2em] text-muted">onwards</span></span>
            </div>
            <div className="flex flex-[1_1_220px] flex-col justify-center gap-2 bg-olive px-7 py-6">
              <span className="text-xs uppercase tracking-[.26em] text-stone">Possession · Dec 2026</span>
              <span className="text-[17px] leading-snug">HMDA &amp; RERA approved · Loans by LIC &amp; others</span>
            </div>
          </div>
          <div data-h className="flex flex-wrap gap-4">
            <button onClick={() => openEnquiry()} className="btn-light h-[62px] px-10 text-[15px]">Enquire now</button>
            <a href="#villas" className="btn-line-light h-[62px] px-10 text-[15px]">Villa configurations</a>
            <a href="#price" className="btn-line-light h-[62px] px-10 text-[15px]">Pricing &amp; plans</a>
          </div>
        </div>
        <div className="relative border-t border-ivory/15 bg-olive-night/40 backdrop-blur-md">
          <div className="wrap grid grid-cols-2 md:grid-cols-4">
            {[['10', 'Acres'], ['136', 'Triplex villas'], ['G+2', '3 & 4 BHK + Media'], ['30+', 'Amenities']].map(([v, k]) => (
              <div key={k} className="flex items-baseline gap-3 py-5 pr-4"><span className="font-serif text-[clamp(34px,3.2vw,48px)] leading-none">{v}</span><span className="text-[11px] uppercase leading-tight tracking-[.16em] text-ivory/75">{k}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden whitespace-nowrap bg-olive-deep py-5 text-stone">
        <div data-marquee className="inline-flex">
          {[...MARQUEE, ...MARQUEE].map((t, i) => <span key={i} className="inline-flex items-center gap-8 pr-8 text-[13px] uppercase tracking-[.2em]">{t}<span className="h-1.5 w-1.5 rotate-45 bg-stone" /></span>)}
        </div>
      </div>

      {/* OVERVIEW */}
      <section id="overview" aria-labelledby="overview-title" className="bg-ivory py-[clamp(90px,11vw,150px)]">
        <div className="wrap">
          <div data-rv className="grid items-end gap-[clamp(24px,5vw,80px)] lg:grid-cols-2">
            <div><p className="eyebrow">Overview · Phase 1</p><h2 id="overview-title" className="h2 mt-5">A gated villa address, <em className="italic">rooted in green.</em></h2></div>
            <div className="flex flex-col gap-4">
              <p className="text-[clamp(16px,1.2vw,18px)] leading-[1.8] text-body"><strong className="font-medium">West Winds by Creative Homes</strong> is a gated community of 136 luxury G+2 triplex villas on 10 acres in Bhanur, West Hyderabad — 3 BHK and 4 BHK homes, each with a dedicated media room, on 170 to 300 sq.yd plots.</p>
              <p className="text-[15px] leading-[1.8] text-soft">₹2.10 Cr onwards (BSP) · HMDA &amp; RERA approved · Loans by LIC &amp; others · Possession December 2026.</p>
            </div>
          </div>
          <div className="mt-[clamp(40px,5vw,70px)] grid auto-rows-[minmax(170px,auto)] grid-cols-1 gap-3 md:grid-cols-6 xl:grid-cols-12">
            <figure data-clipin className="group relative min-h-[340px] overflow-hidden md:col-span-6 md:row-span-2 xl:col-span-7">
              <img src={IMG + 'w/villa-facade.jpg'} alt="West Winds triplex villa elevation" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-lux group-hover:scale-[1.04]" />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-olive-night/75 to-transparent px-6 pb-5 pt-16 text-ivory">
                <span className="font-serif text-[clamp(24px,2.2vw,34px)] leading-tight">Triplex villas, <em className="italic">designed by architects.</em></span>
                <span className="text-[11px] uppercase tracking-wide2">G + 2 · East &amp; West</span>
              </figcaption>
            </figure>
            <div data-clipin className="flex flex-col justify-between gap-4 bg-olive p-8 text-ivory md:col-span-3 xl:col-span-5">
              <span className="text-[11px] uppercase tracking-[.26em] text-stone">Villas starting at</span>
              <span className="font-serif text-[clamp(44px,4.4vw,68px)] leading-none">₹2.10 Cr <span className="font-sans text-xs tracking-[.2em] text-stone">ONWARDS</span></span>
              <span className="text-[13px] text-ivory/75">Est. ROI ~60%+ by possession</span>
            </div>
            <div data-clipin className="grid grid-cols-2 content-center gap-4 bg-sand p-8 md:col-span-3 xl:col-span-5">
              {[[10, 'Acres, gated'], [136, 'Triplex villas']].map(([n, l]) => <div key={l}><div className="font-serif text-[clamp(48px,4.6vw,72px)] leading-[.9]"><span data-count={n}>{n}</span></div><div className="mt-2 text-[11px] uppercase tracking-wide2 text-muted">{l}</div></div>)}
            </div>
            <figure data-clipin className="relative min-h-[220px] overflow-hidden md:col-span-2 xl:col-span-4"><img src={IMG + 'street-3.jpg'} alt="Tree-lined avenue" className="absolute inset-0 h-full w-full object-cover" /><figcaption className="absolute bottom-3.5 left-4 text-xs uppercase tracking-[.16em] text-white drop-shadow">40′ &amp; 30′ avenues</figcaption></figure>
            <div data-clipin className="flex flex-col justify-between gap-3.5 border border-line p-8 md:col-span-2 xl:col-span-4">
              <span className="text-[11px] uppercase tracking-[.26em] text-muted">Configurations</span>
              <span className="font-serif text-[clamp(30px,2.6vw,42px)] leading-tight">3 BHK &amp; 4 BHK <em className="italic">+ Media room</em></span>
              <span className="text-[13px] text-soft">170 – 300 sq.yds · 2,550 – 4,500 sq.ft</span>
            </div>
            <div data-clipin className="flex flex-col justify-between gap-3.5 bg-stone p-8 md:col-span-2 xl:col-span-4">
              <span className="text-[11px] uppercase tracking-[.26em] text-soft">Possession</span>
              <span className="font-serif text-[clamp(34px,3vw,48px)] leading-none">December 2026</span>
              <span className="flex flex-wrap gap-2">{['HMDA', 'RERA', 'LIC LOANS'].map(t => <span key={t} className="border border-olive-deep px-2.5 py-1 text-[10px] tracking-[.18em]">{t}</span>)}</span>
            </div>
          </div>

          {/* Project details tabs */}
          <div className="mt-[clamp(56px,6vw,90px)]">
            <div data-rv className="flex overflow-x-auto border-b border-line [scrollbar-width:none]">
              {PIL.map((p, i) => (
                <button key={p.t} onClick={() => setOvTab(i)} className={`-mb-px flex shrink-0 grow items-baseline gap-2.5 whitespace-nowrap border-b-2 px-5 py-4 text-[13px] uppercase tracking-[.16em] transition-colors ${i === ovTab ? 'border-olive text-olive-deep' : 'border-transparent text-faint'}`}><span className="text-[11px] opacity-60">{String(i + 1).padStart(2, '0')}</span>{p.t}</button>
              ))}
            </div>
            <div className="grid bg-sand md:grid-cols-2">
              <div className="relative min-h-[300px] overflow-hidden"><img key={pil.img} src={IMG + pil.img} alt={pil.alt} className="absolute inset-0 h-full w-full animate-[fadeIn_.8s_ease] object-cover" /></div>
              <div className="flex flex-col justify-center gap-5 p-[clamp(28px,4vw,56px)]">
                <span className="text-xs uppercase tracking-label text-muted">{String(ovTab + 1).padStart(2, '0')} / 06</span>
                <h3 className="font-serif text-[clamp(34px,3.4vw,52px)] leading-none">{pil.t}</h3>
                <dl>{pil.kv.map(r => <div key={r.k} className="grid grid-cols-[minmax(110px,.7fr)_1.3fr] gap-4 border-t border-line py-3.5"><dt className="pt-0.5 text-[11px] uppercase tracking-[.2em] text-muted">{r.k}</dt><dd className="text-base">{r.v}</dd></div>)}</dl>
              </div>
            </div>
          </div>

          <div data-rv className="mt-[clamp(36px,4vw,56px)] bg-sand p-[clamp(22px,3vw,36px)]">
            <div className="flex flex-wrap items-center justify-between gap-4"><h3 className="font-serif text-[clamp(26px,2.4vw,34px)]">Project specifications</h3><button onClick={() => openEnquiry('Download the brochure')} className="btn-dark h-12">Download brochure</button></div>
            <dl className="mt-5 grid gap-x-7 sm:grid-cols-2 lg:grid-cols-4">{GLANCE.map(([k, v]) => <div key={k} className="flex flex-col gap-1 border-t border-line py-3"><dt className="text-[10px] uppercase tracking-wide2 text-muted">{k}</dt><dd className="text-sm">{v}</dd></div>)}</dl>
          </div>
        </div>
      </section>

      {/* VIEWS — pinned horizontal scroll on desktop, swipe on mobile */}
      <section id="views" data-hpin className="overflow-hidden bg-olive-deep py-20 text-ivory lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-10">
        <div className="wrap mb-8 flex w-full flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow text-stone">Views</p><h2 className="h2 mt-4">Walk the <em className="italic">community.</em></h2></div>
          <div className="flex items-center gap-3.5 text-xs uppercase tracking-[.18em] text-ivory/60"><span>{vw >= 1080 ? 'Scroll' : 'Swipe'}</span><span className="relative h-px w-28 overflow-hidden bg-ivory/20"><span data-hbar className="absolute inset-0 origin-left scale-x-0 bg-stone" /></span></div>
        </div>
        <div className="overflow-x-auto [scrollbar-width:none] lg:overflow-visible">
          <div data-htrack className="flex w-max gap-[clamp(14px,1.6vw,24px)] px-5 sm:px-8 lg:px-[72px]">
            {VIEWS.map(([src, t, w, pos], i) => (
              <figure key={t} onClick={() => openLightbox(IMG + src, t)} style={{ width: vw >= 1080 ? w : '80vw' }} className="relative h-[min(60vh,580px)] shrink-0 cursor-zoom-in overflow-hidden bg-olive">
                <img src={IMG + src} alt={t} loading="lazy" style={{ objectPosition: pos }} className="h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-baseline gap-3.5 bg-gradient-to-t from-olive-night/80 to-transparent px-6 pb-5 pt-16"><span className="text-[11px] tracking-[.2em] text-stone">{String(i + 1).padStart(2, '0')}</span><span className="font-serif text-[clamp(22px,2vw,30px)]">{t}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* MASTER PLAN */}
      <section id="masterplan" className="bg-sand py-[clamp(90px,11vw,150px)]">
        <div className="wrap">
          <SectionHead eyebrow="Master plan & layouts" title="Every plot planned around" italic="the landscape.">40′ and 30′ wide internal avenues, a central park with the clubhouse at its heart, sports courts and wellness gardens — with ample lung space between every row of villas.</SectionHead>
          <div className="mb-5 flex flex-wrap gap-2">{MP.map((x, i) => <button key={x.label} onClick={() => setMp(i)} className={`h-11 whitespace-nowrap rounded-full border px-5 text-[13px] transition-colors ${i === mp ? 'border-olive-deep bg-olive-deep text-ivory' : 'border-[#cdbb9c] text-olive-deep'}`}>{x.label}</button>)}</div>
          <div data-rv className="grid bg-olive-deep text-ivory md:grid-cols-[2fr_1fr]">
            <button onClick={() => openLightbox(IMG + m.src, m.label)} className="relative min-h-[clamp(320px,44vw,600px)] cursor-zoom-in overflow-hidden"><img key={m.src} src={IMG + m.src} alt={m.label} style={{ objectPosition: m.pos }} className="absolute inset-0 h-full w-full animate-[fadeIn_.8s_ease] object-cover" /><span className="absolute right-4 top-4 bg-olive-night/70 px-3 py-1.5 text-[11px] uppercase tracking-[.14em]">Tap to enlarge</span></button>
            <div className="flex flex-col gap-4 p-[clamp(26px,3vw,44px)]">
              <span className="text-[11px] uppercase tracking-wide2 text-stone">{String(mp + 1).padStart(2, '0')} / {String(MP.length).padStart(2, '0')}</span>
              <h3 className="font-serif text-[clamp(30px,2.8vw,42px)] leading-tight">{m.label}</h3>
              <p className="text-sm leading-[1.7] text-ivory/75">{m.d}</p>
              <div className="mt-auto grid grid-cols-2 gap-px bg-ivory/15">{[['10', 'Acres'], ['136', 'Villas · Phase 1'], ['40′ / 30′', 'Internal roads'], ['E & W', 'Facings']].map(([v, k]) => <div key={k} className="bg-olive-deep p-4"><div className="font-serif text-[26px] leading-none">{v}</div><div className="mt-1.5 text-[10px] uppercase tracking-[.18em] text-stone">{k}</div></div>)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section id="amenities" className="bg-ivory py-[clamp(90px,11vw,150px)]">
        <div className="wrap">
          <SectionHead eyebrow="Amenities" title="Thirty reasons" italic="to stay in.">A clubhouse for work and celebration, water and fitness, parks and courts — composed across the community so every age has its corner.</SectionHead>
          <div className="grid auto-rows-[clamp(200px,20vw,280px)] grid-cols-2 gap-3.5 md:grid-cols-4 xl:grid-cols-6">
            {AMEN.map(([src, t, cs, rs, pos]) => (
              <figure key={t} data-clipin onClick={() => openLightbox(IMG + src, t)} style={{ gridColumn: `span ${vw < 640 ? Math.min(cs, 2) : cs}`, gridRow: `span ${rs}` }} className="group relative cursor-zoom-in overflow-hidden bg-line">
                <img src={IMG + src} alt={t} loading="lazy" style={{ objectPosition: pos || 'center' }} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.06]" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-olive-night/75 to-transparent px-4 pb-3.5 pt-10 text-sm font-medium text-white">{t}</figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-[clamp(70px,8vw,110px)] grid items-start gap-[clamp(24px,4vw,72px)] lg:grid-cols-[1fr_1.15fr]">
            <div>
              <div className="flex items-baseline justify-between border-b border-olive-deep pb-3.5"><span className="text-xs uppercase tracking-label text-olive">Signature amenities</span><span className="text-xs tracking-[.2em] text-muted">{String(sig + 1).padStart(2, '0')} / {String(SIG.length).padStart(2, '0')}</span></div>
              {SIG.map((x, i) => (
                <button key={x.t} onClick={() => setSig(i)} onMouseEnter={() => setSig(i)} className="grid w-full grid-cols-[44px_1fr_24px] items-baseline gap-3.5 border-b border-line py-5 text-left">
                  <span className={`text-xs tracking-[.16em] ${i === sig ? 'text-olive-deep' : 'text-[#a3a490]'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex flex-col gap-2"><span className={`font-serif text-[clamp(28px,2.8vw,44px)] leading-none transition-colors ${i === sig ? 'italic text-olive-deep' : 'text-faint'}`}>{x.t}</span>{i === sig && <span className="max-w-[460px] text-[15px] leading-relaxed text-soft">{x.d}</span>}</span>
                  <span className={`transition-transform ${i === sig ? 'text-olive-deep' : '-translate-x-2 text-[#a3a490]'}`}>→</span>
                </button>
              ))}
            </div>
            <div className="relative h-[60vw] overflow-hidden bg-olive-deep lg:sticky lg:top-[110px] lg:h-[min(76vh,680px)]">
              {SIG.map((x, i) => (
                <div key={x.t} className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-lux ${i === sig ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'}`}>
                  {x.video ? <video src={POOL_VIDEO} poster={IMG + x.src} autoPlay muted loop playsInline className="h-full w-full object-cover" /> : <img src={IMG + x.src} alt={x.t + ' at West Winds'} loading="lazy" className="h-full w-full object-cover" />}
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-ivory/25"><div className="h-full bg-ivory transition-[width] duration-500" style={{ width: ((sig + 1) / SIG.length * 100) + '%' }} /></div>
            </div>
          </div>

          <div className="mt-[clamp(60px,7vw,100px)]">
            <div data-rv className="flex flex-wrap items-baseline justify-between gap-4 pb-4"><h3 className="font-serif text-[clamp(30px,3vw,46px)]">Complete amenity list</h3><span className="text-xs uppercase tracking-wide2 text-muted">25 amenities · 4 zones</span></div>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {GROUPS.map((g, gi) => { const off = GROUPS.slice(0, gi).reduce((n, x) => n + x.items.length, 0); return (
                <div key={g.t} data-rv className={`flex flex-col gap-4 p-[clamp(22px,2.6vw,34px)] ${g.cls}`}>
                  <div className="flex items-baseline justify-between"><span className="font-serif text-[clamp(26px,2.2vw,32px)] leading-none">{g.t}</span><span className="text-[11px] tracking-[.2em] opacity-60">{String(g.items.length).padStart(2, '0')}</span></div>
                  <ul>{g.items.map((t, i) => <li key={t} className={`grid grid-cols-[28px_1fr] gap-2 border-t py-2.5 text-[15px] ${g.line}`}><span className="pt-0.5 text-[11px] opacity-55">{String(off + i + 1).padStart(2, '0')}</span>{t}</li>)}</ul>
                </div>); })}
            </div>
            
          </div>
        </div>
      </section>

      {/* CONFIGURATIONS */}
      <section id="villas" aria-labelledby="villas-title" className="bg-ivory pb-[clamp(90px,11vw,150px)]">
        <div className="wrap">
          <SectionHead eyebrow="Configurations" title="Two triplex types," italic="one standard.">Every West Winds villa is a G+2 triplex with a dedicated media room — 2,550 to 4,500 sq.ft built up on 170 to 300 sq.yd plots, in East and West facings.</SectionHead>
          <div className="flex flex-col gap-3 md:h-[clamp(560px,48vw,720px)] md:flex-row">
            {CONFIGS.map((c, i) => { const on = vw < 768 || i === cfg; return (
              <article key={c.t} onMouseEnter={() => setCfg(i)} onClick={() => setCfg(i)} style={{ flex: vw < 768 ? '1 1 auto' : (i === cfg ? '1.7 1 0' : '1 1 0') }} className="relative min-h-[520px] cursor-pointer overflow-hidden bg-olive-deep transition-[flex] duration-[900ms] ease-panel md:min-h-0">
                <img src={IMG + c.img} alt={'West Winds ' + c.t + ' villa interior'} className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-lux ${on ? 'scale-100' : 'scale-[1.08]'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-olive-night/90 via-olive-night/35 to-olive-night/10" />
                <div className="absolute inset-x-6 top-6 flex justify-between text-[11px] uppercase tracking-[.26em] text-ivory"><span>{c.tag}</span><span>G + 2 · Triplex</span></div>
                <div className="absolute inset-x-6 bottom-6 flex flex-col gap-4 text-ivory sm:inset-x-9 sm:bottom-9">
                  <h3 className="whitespace-nowrap font-serif text-[clamp(40px,4.4vw,68px)] font-normal leading-[.95]">{c.t}</h3>
                  <div className={`grid transition-[grid-template-rows] duration-[800ms] ease-panel ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="flex flex-col gap-4 overflow-hidden">
                      <p className="max-w-[520px] text-[15px] leading-relaxed text-ivory/85">{c.d}</p>
                      <div className="grid grid-cols-3 border-t border-ivory/25">{c.specs.map(([k, v]) => <div key={k} className="flex flex-col gap-1 pr-3 pt-3.5"><span className="text-[10px] uppercase tracking-[.2em] text-stone">{k}</span><span className="text-[15px]">{v}</span></div>)}</div>
                      <button onClick={() => openEnquiry('Get the ' + c.short + ' price sheet')} className="btn-light h-[50px] self-start">Get {c.short} price sheet</button>
                    </div>
                  </div>
                </div>
              </article>); })}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">{USPS.map((t, i) => <div key={t} data-rv className="flex items-center gap-4 bg-sand px-6 py-5"><span className="font-serif text-[30px] leading-none text-faint">0{i + 1}</span><span className="text-[15px]">{t}</span></div>)}</div>
        </div>
      </section>

      {/* FLOOR PLANS */}
      <section id="plans" className="bg-olive-deep py-[clamp(90px,11vw,150px)] text-ivory">
        <div className="wrap">
          <SectionHead light eyebrow="Floor plans" title="Choose your" italic="plot.">17 layouts, East and West facing. Free floor-plan customisation on every villa — dimensioned plans shared on enquiry.</SectionHead>
          <div className="mb-4 grid grid-cols-4 gap-1.5 sm:grid-cols-8">{SIZES.map(v => <button key={v} onClick={() => { setPlanSize(v); setPlanI(PLANS.find(p => p.size === v).i); }} className={`flex flex-col items-center gap-1 border py-4 transition-colors ${v === planSize ? 'border-ivory bg-ivory text-olive-deep' : 'border-ivory/25'}`}><span className="font-serif text-[clamp(26px,2.4vw,34px)] leading-none">{v}</span><span className="text-[10px] uppercase tracking-[.16em] opacity-70">sq.yds</span></button>)}</div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3.5">
            <div className="flex flex-wrap gap-2">{forSize.map(p => <button key={p.i} onClick={() => setPlanI(p.i)} className={`flex h-[42px] items-center gap-2.5 whitespace-nowrap rounded-full border px-4 text-[13px] ${p.i === plan.i ? 'border-ivory bg-ivory text-olive-deep' : 'border-ivory/30'}`}><b className="text-[10px] uppercase tracking-[.16em]">{p.facing}</b><span className="opacity-50">|</span>{p.dims}</button>)}</div>
            <button onClick={() => openEnquiry('Request detailed floor plans')} className="btn-light h-11">Request detailed plans</button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[['g', 'Ground floor'], ['f', 'First floor'], ['s', 'Second floor']].map(([k, label]) => (
              <figure key={k} onClick={() => openLightbox(fp(plan[k]), `${plan.facing} facing · ${plan.size} sq.yds · ${label}`, '#fff')} className="flex cursor-zoom-in flex-col gap-3.5 bg-ivory p-4 text-olive-deep">
                <div className="flex h-[clamp(300px,32vw,460px)] items-center justify-center bg-sand p-3"><img src={fp(plan[k])} alt={`West Winds ${plan.facing} facing ${plan.size} sq.yds ${label} plan`} loading="lazy" className="max-h-full max-w-full object-contain" /></div>
                <figcaption className="flex justify-between gap-2.5"><span className="text-[13px] font-semibold uppercase tracking-[.14em]">{label}</span><span className="text-xs text-muted">{plan.facing} · {plan.size} sq.yds</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <PriceSection />

      {/* LOCATION */}
      <section id="location" className="bg-ivory py-[clamp(90px,11vw,150px)]">
        <div className="wrap">
          <SectionHead eyebrow="Location" title="Bhanur, on Hyderabad’s" italic="growth side.">Bhanur, off Pipeline Road near Shankarpalli — inside the Kokapet – Shankarpalli – Mutangi / Patancheru growth triangle, linked to the Kollur ORR via Radial Road 7.</SectionHead>
          <div className="grid gap-[clamp(24px,4vw,64px)] lg:grid-cols-[1fr_1.1fr]">
            <div data-rv>
              <p className="text-[11px] uppercase tracking-[.24em] text-muted">Drive times</p>
              <div className="mt-3.5 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">{DRIVES.map(([mm, p]) => <div key={p} className="flex flex-col gap-1.5 bg-ivory p-4"><span className="font-serif text-[clamp(30px,2.6vw,40px)] leading-none">{mm}<span className="ml-1.5 font-sans text-xs tracking-[.14em] text-muted">MIN</span></span><span className="text-[13px] leading-snug text-body">{p}</span></div>)}</div>
              <div className="mt-6 flex flex-wrap gap-3"><a href="#why-bhanur" className="btn-dark">Location advantages</a><a href={MAP_URL} target="_blank" rel="noreferrer" className="btn-line">Open in Google Maps ↗</a></div>
            </div>
            <div data-rv className="relative min-h-[clamp(380px,40vw,560px)] bg-sand"><iframe title="West Winds location map — Bhanur, Hyderabad" src="https://maps.google.com/maps?q=Bhanur%2C%20Telangana&z=12&output=embed" loading="lazy" className="absolute inset-0 h-full w-full border-0 grayscale-[.7] sepia-[.12]" /></div>
          </div>
        </div>
      </section>

      <WhyBhanur />

      {/* FAQ */}
      <section id="faq" className="bg-white py-[clamp(90px,11vw,150px)]">
        <div className="wrap grid items-start gap-[clamp(30px,5vw,80px)] md:grid-cols-[.8fr_1.6fr]">
          <div data-rv className="flex flex-col gap-4 md:sticky md:top-[110px]">
            <p className="eyebrow">Frequently asked</p>
            <h2 className="h2">Questions, answered <em className="italic">plainly.</em></h2>
            <button onClick={() => setAllFaq(v => !v)} className="btn-line mt-2 self-start">{allFaq ? 'Show fewer' : 'All ' + ALL_FAQ.length + ' FAQs'}</button>
          </div>
          <div className="border-t border-olive-deep">
            {(allFaq ? ALL_FAQ : ALL_FAQ.slice(0, 7)).map(([q, a], i) => (
              <div key={q} className="border-b border-line">
                <button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i} className="flex w-full items-center justify-between gap-5 py-6 text-left"><span className="font-serif text-[clamp(22px,2vw,28px)] leading-tight">{q}</span><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg ${faq === i ? 'border-olive bg-olive text-ivory' : 'border-[#cdbb9c]'}`}>{faq === i ? '–' : '+'}</span></button>
                {faq === i && <p className="pb-6 pr-14 text-[15px] leading-[1.75] text-soft">{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden bg-olive-deep py-[clamp(90px,11vw,150px)] text-ivory">
        <img data-px src={IMG + 'w/pavilion.jpg'} alt="" className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,46,37,.96)_30%,rgba(44,46,37,.6))]" />
        <div className="wrap relative grid items-center gap-[clamp(40px,6vw,90px)] lg:grid-cols-2">
          <div data-rv className="flex flex-col gap-5">
            <p className="eyebrow text-stone">Site visits daily</p>
            <h2 className="font-serif text-[clamp(46px,5.6vw,92px)] font-normal leading-[.96]">Embrace <em className="italic">the change.</em></h2>
            <p className="max-w-[460px] text-base leading-[1.7] text-ivory/80">Walk the avenues, see the show villa and meet the architects. Possession from December 2026.</p>
            <p className="text-sm text-ivory/75">Site · Sy. No. 353, Bhanur – Shankarpally, Hyderabad, Telangana</p>
          </div>
          <div data-rv className="bg-ivory p-[clamp(24px,3vw,40px)] text-olive-deep"><h3 className="mb-4 font-serif text-[34px] leading-tight">Schedule a site visit</h3><EnquiryForm cta="Book my visit" /></div>
        </div>
      </section>
      <style>{'@keyframes fadeIn{from{opacity:0;transform:scale(1.04)}to{opacity:1;transform:scale(1)}}'}</style>
    </main>
  );
}
