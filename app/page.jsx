import Home from '../src/views/Home.jsx';
import JsonLd from '../src/components/JsonLd.jsx';
import { pageMeta } from '../src/site.js';

export const metadata = pageMeta('/');

export default function Page() {
  return (
    <>
      <Home />
    </>
  );
}
