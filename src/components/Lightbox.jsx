'use client';
export default function Lightbox({ src, title, bg = 'transparent', onClose }) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-[#080c09]/95 p-4 sm:p-14">
      <img src={src} alt={title} style={{ background: bg }} className="max-h-full max-w-full object-contain" />
      <p className="absolute left-6 top-5 font-serif text-2xl text-ivory">{title}</p>
      <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 h-11 w-11 rounded-full border border-ivory/30 text-2xl text-ivory">×</button>
    </div>
  );
}
