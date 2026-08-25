import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/seo';
import {locales} from '@/lib/i18n';
import {serviceSlugs as fallbackSlugs} from '@/lib/services';
import {getSupabasePublic} from '@/lib/supabase-public';
import {getExerciseLibraryForLocale} from '@/lib/repdb';

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const fixed=['','/services','/exercises','/about','/pricing','/contact','/locations/toronto'];
  let slugs:string[]=[...fallbackSlugs];
  const db=getSupabasePublic();
  if(db){const {data}=await db.from('services').select('slug').eq('active',true);if(data?.length)slugs=[...new Set(data.map((x:any)=>x.slug))];}
  const pages=locales.flatMap(lang=>fixed.map(path=>({url:`${siteUrl}/${lang}${path}`,lastModified:new Date(),changeFrequency:path===''?'weekly' as const:'monthly' as const,priority:path===''?1:path==='/services'||path==='/locations/toronto'?0.9:0.7})));
  const services=locales.flatMap(lang=>slugs.map(slug=>({url:`${siteUrl}/${lang}/services/${slug}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:0.85})));
  const exerciseData=await getExerciseLibraryForLocale('en');
  const exercisePages=locales.flatMap(lang=>exerciseData.map(ex=>({url:`${siteUrl}/${lang}/exercises/${ex.id}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:0.62})));
  return [...pages,...services,...exercisePages];
}
