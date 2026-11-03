import './globals.css';
import UIProvider from '../src/components/UIProvider.jsx';
import Header from '../src/components/Header.jsx';
import Footer from '../src/components/Footer.jsx';
import JsonLd from '../src/components/JsonLd.jsx';
import { SITE_URL, SITE_NAME, GEO, ADDRESS, pageMeta } from '../src/site.js';
import { AMEN_LIST, FAQ_GROUPS } from '../src/data.js';

const home = pageMeta('/');
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: home.title, template: '%s' },
  description: home.description,
  applicationName: SITE_NAME,
  keywords: ['West Winds', 'West Winds Bhanur', 'Creative Homes West Winds', 'villas in Bhanur', 'triplex villas Hyderabad', '3 BHK villas Shankarpalli', '4 BHK villas West Hyderabad', 'gated villas near Kollur ORR', 'HMDA RERA approved villas Hyderabad', 'luxury villas near Kokapet', 'villas near Gachibowli'],
  alternates: { canonical: '/' },
  openGraph: home.openGraph,
  twitter: home.twitter,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  icons: { icon: '/img/logo-creativehomes.png' },
  other: {
    'geo.region': GEO.region,
    'geo.placename': GEO.placename,
    'geo.position': `${GEO.lat};${GEO.lng}`,
    ICBM: `${GEO.lat}, ${GEO.lng}`,
  },
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#2c2e25' };

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': SITE_URL + '/#website', url: SITE_URL + '/', name: SITE_NAME, inLanguage: 'en-IN' },
    { '@type': 'Organization', '@id': SITE_URL + '/#org', name: 'Creative Homes', logo: SITE_URL + '/img/logo-creativehomes.png' },
    { '@type': ['Place', 'GatedResidenceCommunity'], '@id': SITE_URL + '/#project', name: 'West Winds — Phase 1',
      description: '136 luxury G+2 triplex villas (3 BHK + Media and 4 BHK + Media) on 10 acres in Bhanur, West Hyderabad. Plots 170–300 sq.yds, built-up 2,550–4,500 sq.ft, East & West facing. HMDA & RERA approved. Possession December 2026.',
      address: { '@type': 'PostalAddress', ...ADDRESS },
      geo: { '@type': 'GeoCoordinates', latitude: GEO.lat, longitude: GEO.lng },
      hasMap: 'https://maps.app.goo.gl/ExA6sH6VL3sJsfiF8',
      containedInPlace: { '@type': 'City', name: 'Hyderabad' },
      numberOfAccommodationUnits: 136,
      amenityFeature: AMEN_LIST.map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
      image: [SITE_URL + '/img/w/gateway.jpg', SITE_URL + '/img/w/villa-facade.jpg', SITE_URL + '/img/w/pool.jpg'] },
    { '@type': 'FAQPage', '@id': SITE_URL + '/#faq', mainEntity: FAQ_GROUPS.flatMap(([, qs]) => qs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))) },
    { '@type': 'Product', name: 'West Winds Luxury Triplex Villa', brand: { '@id': SITE_URL + '/#org' }, image: SITE_URL + '/img/w/villa-facade.jpg',
      description: '3 BHK and 4 BHK + Media room G+2 triplex villas on 170–300 sq.yd plots in Bhanur, Hyderabad.',
      offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: 21000000, highPrice: 36000000, offerCount: 136, availability: 'https://schema.org/PreOrder' } },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap" />
        <JsonLd data={SCHEMA} />
      </head>
      <body className="bg-ivory text-olive-deep font-sans antialiased">
        <UIProvider>
          <Header />
          {children}
          <Footer />
        </UIProvider>
      </body>
    </html>
  );
}
