'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import EnquiryModal from './EnquiryModal.jsx';
import Lightbox from './Lightbox.jsx';

const UI = createContext(null);
export const useUI = () => useContext(UI);

export default function UIProvider({ children }) {
  const [enquiry, setEnquiry] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const { hash } = window.location;
    if (hash) { const el = document.querySelector(hash); if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80 }); return; } }
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') { setEnquiry(null); setLightbox(null); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const ui = {
    openEnquiry: (title = 'Get price & floor plans') => setEnquiry({ title }),
    openLightbox: (src, title, bg) => setLightbox({ src, title, bg }),
  };
  return (
    <UI.Provider value={ui}>
      {children}
      {enquiry && <EnquiryModal title={enquiry.title} onClose={() => setEnquiry(null)} />}
      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
    </UI.Provider>
  );
}
