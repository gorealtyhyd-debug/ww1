'use client';
export default function SectionHead({ eyebrow, title, italic, children, light = false, className = '' }) {
  return (
    <div data-rv className={`mb-[clamp(36px,4vw,56px)] grid items-end gap-8 lg:grid-cols-2 ${className}`}>
      <div>
        <p className={`eyebrow ${light ? 'text-stone' : ''}`}>{eyebrow}</p>
        <h2 className={`h2 mt-4 ${light ? 'text-ivory' : 'text-olive-deep'}`}>{title} {italic && <em className="italic">{italic}</em>}</h2>
      </div>
      {children && <p className={`max-w-[520px] text-base leading-[1.75] ${light ? 'text-ivory/75' : 'text-soft'}`}>{children}</p>}
    </div>
  );
}
