import type { Metadata } from 'next';
import type { Locale } from './i18n';
import { getSupabasePublic } from './supabase-public';
import { localeMetadata, siteUrl, brandName } from './seo';

export async function dynamicMetadata(lang: Locale, path = ''): Promise<Metadata> {
  const fallback = localeMetadata(lang, path);
  const supabase = getSupabasePublic();
  if (!supabase) return fallback;
  const { data } = await supabase
    .from('seo_entries')
    .select('title,description,og_title,og_description,indexable')
    .eq('path', path || '/')
    .eq('locale', lang)
    .maybeSingle();
  if (!data) return fallback;
  const canonical = `/${lang}${path}`;
  const title = data.title || fallback.title;
  const description = data.description || fallback.description;
  return {
    ...fallback,
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'en-CA': `/en${path}`,
        fa: `/fa${path}`,
        'fr-CA': `/fr${path}`,
        es: `/es${path}`,
        'x-default': `/en${path}`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}${canonical}`,
      title: data.og_title || title || brandName,
      description: data.og_description || description || '',
      siteName: brandName,
      images: [{ url: '/images/founder.jpg', width: 1200, height: 630, alt: brandName }],
    },
    robots: { index: data.indexable !== false, follow: data.indexable !== false },
  };
}
