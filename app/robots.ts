import type {MetadataRoute} from 'next';import {siteUrl} from '@/lib/seo';
const privatePaths=['/*/dashboard','/*/dashboard/*','/*/admin','/*/admin/*','/*/login','/api/*','/auth/*'];
export default function robots():MetadataRoute.Robots{return {rules:[{userAgent:'*',allow:'/',disallow:privatePaths},{userAgent:'GPTBot',allow:'/',disallow:privatePaths},{userAgent:'OAI-SearchBot',allow:'/',disallow:privatePaths},{userAgent:'PerplexityBot',allow:'/',disallow:privatePaths}],sitemap:`${siteUrl}/sitemap.xml`,host:siteUrl}}
