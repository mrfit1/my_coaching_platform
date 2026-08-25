import type {MetadataRoute} from 'next';import {siteUrl} from '@/lib/seo';
export default function robots():MetadataRoute.Robots{return {rules:[{userAgent:'*',allow:'/',disallow:['/*/dashboard','/*/login']},{userAgent:'GPTBot',allow:'/'},{userAgent:'OAI-SearchBot',allow:'/'},{userAgent:'PerplexityBot',allow:'/'}],sitemap:`${siteUrl}/sitemap.xml`,host:siteUrl}}
