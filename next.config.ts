import type { NextConfig } from 'next';
const securityHeaders=[
  {key:'X-Content-Type-Options',value:'nosniff'},
  {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
  {key:'Permissions-Policy',value:'camera=(), microphone=(self), geolocation=(self)'},
  {key:'X-Frame-Options',value:'SAMEORIGIN'},
  {key:'Cross-Origin-Opener-Policy',value:'same-origin-allow-popups'},
];
const nextConfig:NextConfig={reactStrictMode:true,poweredByHeader:false,compress:true,images:{formats:['image/avif','image/webp'],remotePatterns:[{protocol:'https',hostname:'exercise-dataset.com',pathname:'/images/**'}]},async headers(){return [{source:'/:path*',headers:securityHeaders}]}};
export default nextConfig;
