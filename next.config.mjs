/** Static export — no server code. Output goes to /out and can be hosted on any static host / CDN. */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
