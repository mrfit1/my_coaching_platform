import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: { optimizePackageImports: ['lucide-react'] }
};
export default nextConfig;
