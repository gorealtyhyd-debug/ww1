// Central SEO / GEO config — update SITE_URL to your production domain before building.
export const SITE_URL = 'https://www.westwinds-bhanur.in';
export const SITE_NAME = 'West Winds by Creative Homes';
export const GEO = {
  region: 'IN-TG',
  placename: 'Bhanur, Sangareddy, Hyderabad, Telangana',
  // Approximate coordinates for Bhanur — replace with the exact site pin from Google Maps.
  lat: 17.4527, lng: 78.2075,
};
export const ADDRESS = {
  streetAddress: 'Sy. No. 353, Bhanur – Shankarpally Road',
  addressLocality: 'Bhanur',
  addressRegion: 'Telangana',
  postalCode: '502305',
  addressCountry: 'IN',
};
export const MAP_URL = 'https://maps.app.goo.gl/ExA6sH6VL3sJsfiF8';

export const PAGES = [
  { path: '/', title: 'West Winds by Creative Homes | 3 & 4 BHK Luxury Triplex Villas in Bhanur, Hyderabad', description: '136 luxury G+2 triplex villas on 10 acres in Bhanur, West Hyderabad. 3 & 4 BHK + Media room, 170–300 sq.yds plots, from ₹2.10 Cr. HMDA & RERA approved. LIC loans. Possession Dec 2026.', img: '/img/w/gateway.jpg', priority: 1 },
];

export function pageMeta(path) {
  const p = PAGES.find(x => x.path === path);
  return {
    title: p.title, description: p.description,
    alternates: { canonical: p.path },
    openGraph: { type: 'website', url: p.path, title: p.title, description: p.description, siteName: SITE_NAME, locale: 'en_IN', images: [{ url: p.img, width: 1600, height: 900, alt: p.title }] },
    twitter: { card: 'summary_large_image', title: p.title, description: p.description, images: [p.img] },
  };
}
