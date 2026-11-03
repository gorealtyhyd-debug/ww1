'use client';
import { useUI } from '../components/UIProvider.jsx';
import SectionHead from '../components/SectionHead.jsx';

const LINES = [['Basic sale price', '₹2.10 Cr onwards'], ['GST, stamp duty & mutation', 'Extra, as applicable'], ['Corpus & 2 years FMS', '₹5 lakh'], ['Home loans', 'LIC & other lenders'], ['Approvals', 'HMDA · RERA'], ['Possession', 'December 2026']];
const STEPS = [['Site visit', 'Walk the avenues and the show villa.'], ['Choose your plot', 'Size, facing and layout.'], ['Customise', 'Free floor-plan changes with our architects.'], ['Handover', 'Possession from December 2026.']];

const DRIVERS = [
  ['Emerging educational hub', 'Surrounded by 18+ premier schools and institutions.'],
  ['Nagulapalli Mega Terminal', '20 platforms, 14 pit lines, 24 stabling lines — for 2.32 lakh passengers and 325 trains daily.'],
  ['49.91 km, 6-lane corridor', 'High-speed road from Gandipet / Narsingi to Shankarpalli.'],
  ['Multiple connectivity zones', 'Bhanur (Pipeline Road) links to the Kollur ORR via the Radial Road 7 corridor.'],
  ['Lung space & greenery', 'Low-density surroundings with ample open land and green cover.'],
];
const ROUTE = [['Bhanur', 'Pipeline Road'], ['Tellapur', 'Radial Road 7'], ['Kollur ORR', 'Junction'], ['Financial District', 'IT corridor'], ['Gachibowli', 'Business hub']];

export function PriceSection() {
  const { openEnquiry } = useUI();
  return (
    <>
      <div className="wrap pb-[clamp(36px,4vw,56px)]"><SectionHead eyebrow="Price & investment" title="Villas from" italic="₹2.10 Cr.">Transparent charges, LIC-approved home loans and an estimated ~60%+ ROI by possession.</SectionHead></div>
<section id="price" className="bg-ivory pb-[clamp(90px,11vw,150px)]">
        <div className="wrap grid gap-4 lg:grid-cols-2">
          <div data-rv className="relative flex flex-col gap-5 bg-olive-deep p-[clamp(28px,3.4vw,48px)] text-ivory">
            <span className="absolute right-6 top-6 bg-stone px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-olive-deep">Phase 1</span>
            <p className="text-xs uppercase tracking-wide2 text-stone">Villas starting at</p>
            <p className="font-serif text-[clamp(56px,6vw,92px)] leading-[.95]">₹2.10 Cr <span className="font-sans text-sm tracking-[.2em] text-stone">ONWARDS</span></p>
            <p className="text-sm text-ivory/75">170 – 300 sq.yds · East &amp; West facing · 3 &amp; 4 BHK + Media</p>
            <dl className="mt-2 border-t border-ivory/15">{LINES.map(([k, v]) => <div key={k} className="flex justify-between gap-4 border-b border-ivory/10 py-3.5 text-sm"><dt className="text-ivory/75">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>)}</dl>
            <button onClick={() => openEnquiry('Get the price sheet')} className="btn-light mt-auto">Get the price sheet</button>
          </div>
          <div className="grid gap-4">
            <div data-rv className="flex flex-wrap items-end justify-between gap-5 bg-stone p-[clamp(28px,3.4vw,44px)]">
              <div><p className="text-xs uppercase tracking-wide2 text-soft">Estimated ROI by possession</p><p className="mt-2.5 font-serif text-[clamp(64px,7vw,110px)] leading-[.9]"><span data-count="60">60</span>%+</p></div>
              <p className="max-w-[230px] text-[13px] leading-relaxed text-olive">Bhanur sits inside the West Zone’s Golden Triangle. An estimate — not a guarantee of returns.</p>
            </div>
            <div data-rv className="flex flex-col gap-5 bg-sand p-[clamp(28px,3.4vw,44px)]">
              <p className="text-xs uppercase tracking-wide2 text-olive">Buying at West Winds</p>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{STEPS.map(([t, d], i) => <div key={t} className="flex flex-col gap-2"><span className="font-serif text-[30px] leading-none text-olive">0{i + 1}</span><span className="font-semibold">{t}</span><span className="text-[13px] leading-snug text-soft">{d}</span></div>)}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function WhyBhanur() {
  return (
    <section id="why-bhanur" className="bg-sand py-[clamp(70px,9vw,120px)]">
        <div className="wrap">
          <SectionHead eyebrow="Why Bhanur" title="Five reasons the west" italic="is rising." />
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">{DRIVERS.map(([t, d], i) => <article key={t} data-rv className="flex flex-col gap-2.5 bg-sand p-7"><span className="font-serif text-[28px] leading-none text-faint">0{i + 1}</span><h3 className="font-serif text-[clamp(22px,2vw,28px)] leading-tight">{t}</h3><p className="text-sm leading-relaxed text-soft">{d}</p></article>)}</div>
          <div data-rv className="mt-4 bg-ivory p-[clamp(22px,3vw,36px)]">
            <p className="mb-6 text-[11px] uppercase tracking-[.22em] text-muted">Strategic connectivity · via Radial Road 7</p>
            <div className="relative grid gap-5 sm:grid-cols-5"><div className="absolute inset-x-2 top-2 hidden border-t border-dashed border-olive sm:block" />{ROUTE.map(([t, s], i) => <div key={t} className="relative flex flex-col gap-2"><span className={`h-[17px] w-[17px] rounded-full border-4 border-ivory ring-1 ring-olive ${i === 0 ? 'bg-olive' : 'bg-sand'}`} /><span className="font-serif text-[23px] leading-tight">{t}</span><span className="text-xs text-muted">{s}</span></div>)}</div>
          </div>
        </div>
      </section>
  );
}
