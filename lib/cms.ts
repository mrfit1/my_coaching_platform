import { getSupabasePublic } from './supabase-public';
import type { Locale } from './i18n';

export type LocalizedText = Partial<Record<Locale, string>>;
export type CmsPage = {
  slug: string;
  title: LocalizedText;
  eyebrow: LocalizedText;
  body: LocalizedText;
  extra: Record<string, unknown>;
};

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  const supabase = getSupabasePublic();
  if (!supabase) return null;
  const { data } = await supabase
    .from('cms_pages')
    .select('slug,title,eyebrow,body,extra')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  return data as CmsPage | null;
}

export function localized(value: LocalizedText | null | undefined, lang: Locale, fallback = '') {
  return value?.[lang] || value?.en || fallback;
}

export async function getPublicServices(lang: Locale) {
  const supabase = getSupabasePublic();
  if (!supabase) return null;
  const { data } = await supabase
    .from('services')
    .select('id,slug,title,short_description,description,service_type,active,sort_order')
    .eq('active', true)
    .order('sort_order');
  if (!data?.length) return null;
  return data.map((s: any) => ({
    ...s,
    titleText: localized(s.title, lang, s.slug),
    shortText: localized(s.short_description, lang, ''),
    descriptionText: localized(s.description, lang, ''),
  }));
}

export async function getSiteSettings() {
  const supabase = getSupabasePublic();
  if (!supabase) return {} as Record<string, any>;
  const { data } = await supabase.from('site_settings').select('key,value');
  return Object.fromEntries((data || []).map((r: any) => [r.key, r.value]));
}

export async function getPublicTestimonials(lang: Locale) {
  const supabase=getSupabasePublic(); if(!supabase)return [];
  const {data}=await supabase.from('testimonials').select('id,client_name,quote,rating').eq('active',true).order('sort_order').limit(12);
  return (data||[]).map((r:any)=>({...r,quoteText:localized(r.quote,lang,'')})).filter((r:any)=>r.quoteText);
}
