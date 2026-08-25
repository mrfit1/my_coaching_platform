import { getSupabasePublic } from './supabase-public';
import { localized } from './cms';
import type { Locale } from './i18n';

export async function buildPublicAiContext(lang:Locale){
  const supabase=getSupabasePublic();
  if(!supabase) return {services:[],packages:[],trainers:[],settings:{}};
  const [{data:services},{data:packages},{data:trainers},{data:settings}]=await Promise.all([
    supabase.from('services').select('slug,title,short_description,description,service_type').eq('active',true).order('sort_order'),
    supabase.from('packages').select('slug,name,description,price_cents,currency,billing_type').eq('active',true).order('sort_order'),
    supabase.from('trainer_profiles').select('display_name,slug,bio,specialties,languages,service_areas,accepting_clients').eq('active',true),
    supabase.from('site_settings').select('key,value'),
  ]);
  return {
    services:(services||[]).map((s:any)=>({slug:s.slug,title:localized(s.title,lang,s.slug),description:localized(s.description,lang,localized(s.short_description,lang,'')),type:s.service_type})),
    packages:(packages||[]).map((p:any)=>({slug:p.slug,name:localized(p.name,lang,p.slug),description:localized(p.description,lang,''),price_cents:p.price_cents,currency:p.currency,billing_type:p.billing_type})),
    trainers:(trainers||[]).map((t:any)=>({name:t.display_name,bio:localized(t.bio,lang,''),specialties:t.specialties,languages:t.languages,service_areas:t.service_areas,accepting_clients:t.accepting_clients})),
    settings:Object.fromEntries((settings||[]).filter((x:any)=>['brand_name','contact_email','contact_phone','service_areas','online_coaching_worldwide'].includes(x.key)).map((x:any)=>[x.key,x.value])),
  };
}
