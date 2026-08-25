'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { adminDb } from '@/lib/admin-data';

function text(fd: FormData, key: string) { return String(fd.get(key) || '').trim(); }
function bool(fd: FormData, key: string) { return fd.get(key) === 'on' || fd.get(key) === 'true'; }
function localized(fd: FormData, prefix: string) {
  return { en:text(fd,`${prefix}_en`), fa:text(fd,`${prefix}_fa`), fr:text(fd,`${prefix}_fr`), es:text(fd,`${prefix}_es`) };
}
function cleanLocalized(obj: Record<string,string>) { return Object.fromEntries(Object.entries(obj).filter(([,v])=>v)); }
function done(lang: string, path: string) { revalidatePath(`/${lang}`,'layout'); redirect(`/${lang}/admin/${path}?saved=1`); }

export async function savePageContent(lang: string, fd: FormData) {
  const { supabase } = await adminDb(lang);
  const slug=text(fd,'slug');
  const payload={
    slug,
    eyebrow:cleanLocalized(localized(fd,'eyebrow')),
    title:cleanLocalized(localized(fd,'title')),
    body:cleanLocalized(localized(fd,'body')),
    published:bool(fd,'published'),
    updated_at:new Date().toISOString(),
  };
  const { error }=await supabase.from('cms_pages').upsert(payload,{onConflict:'slug'});
  if(error) throw new Error(error.message);
  done(lang,'content');
}

export async function saveService(lang: string, fd: FormData) {
  const { supabase }=await adminDb(lang);
  const id=text(fd,'id');
  const payload:any={
    slug:text(fd,'slug'), title:cleanLocalized(localized(fd,'title')),
    short_description:cleanLocalized(localized(fd,'short')),
    description:cleanLocalized(localized(fd,'description')),
    service_type:text(fd,'service_type')||'personal_training',
    active:bool(fd,'active'), sort_order:Number(text(fd,'sort_order')||0), updated_at:new Date().toISOString(),
  };
  const query=id ? supabase.from('services').update(payload).eq('id',id) : supabase.from('services').insert(payload);
  const {error}=await query;
  if(error) throw new Error(error.message);
  done(lang,'services');
}

export async function deleteService(lang:string, fd:FormData){
  const {supabase}=await adminDb(lang); const id=text(fd,'id');
  const {error}=await supabase.from('services').delete().eq('id',id); if(error)throw new Error(error.message);
  done(lang,'services');
}

export async function saveTrainer(lang:string, fd:FormData){
  const {supabase}=await adminDb(lang); const id=text(fd,'id');
  const payload:any={
    display_name:text(fd,'display_name'), slug:text(fd,'slug'), bio:cleanLocalized(localized(fd,'bio')),
    specialties:text(fd,'specialties').split(',').map(v=>v.trim()).filter(Boolean),
    languages:text(fd,'languages').split(',').map(v=>v.trim()).filter(Boolean),
    service_areas:text(fd,'service_areas').split(',').map(v=>v.trim()).filter(Boolean),
    active:bool(fd,'active'), accepting_clients:bool(fd,'accepting_clients'), updated_at:new Date().toISOString(),
  };
  const q=id?supabase.from('trainer_profiles').update(payload).eq('id',id):supabase.from('trainer_profiles').insert(payload);
  const {error}=await q; if(error)throw new Error(error.message); done(lang,'trainers');
}

export async function updateBooking(lang:string, fd:FormData){
  const {supabase}=await adminDb(lang); const id=text(fd,'id');
  const {error}=await supabase.from('appointments').update({status:text(fd,'status'),trainer_id:text(fd,'trainer_id')||null,updated_at:new Date().toISOString()}).eq('id',id);
  if(error)throw new Error(error.message); done(lang,'bookings');
}

export async function saveSeo(lang:string, fd:FormData){
  const {supabase}=await adminDb(lang);
  const payload={path:text(fd,'path')||'/',locale:text(fd,'locale')||'en',title:text(fd,'title'),description:text(fd,'description'),og_title:text(fd,'og_title'),og_description:text(fd,'og_description'),indexable:bool(fd,'indexable'),updated_at:new Date().toISOString()};
  const {error}=await supabase.from('seo_entries').upsert(payload,{onConflict:'path,locale'}); if(error)throw new Error(error.message); done(lang,'seo');
}

export async function saveSetting(lang:string, fd:FormData){
  const {supabase}=await adminDb(lang); const key=text(fd,'key');
  let value:any=text(fd,'value');
  try{value=JSON.parse(value)}catch{}
  const {error}=await supabase.from('site_settings').upsert({key,value,updated_at:new Date().toISOString()},{onConflict:'key'}); if(error)throw new Error(error.message); done(lang,'settings');
}

export async function saveClientPlan(lang:string, fd:FormData){
  const {supabase}=await adminDb(lang);
  const type=text(fd,'plan_type');
  const payload:any={client_id:text(fd,'client_id'),trainer_id:text(fd,'trainer_id')||null,title:text(fd,'title'),status:'active',updated_at:new Date().toISOString()};
  if(type==='training'){
    payload.content={notes:text(fd,'content')};
    const {error}=await supabase.from('training_plans').insert(payload); if(error)throw new Error(error.message);
  }else{
    payload.content={notes:text(fd,'content')};
    const {error}=await supabase.from('nutrition_plans').insert(payload); if(error)throw new Error(error.message);
  }
  done(lang,'plans');
}

export async function savePackage(lang:string, fd:FormData){
  const {supabase}=await adminDb(lang); const id=text(fd,'id');
  const cents=Number(text(fd,'price_cents')||0);
  const payload:any={slug:text(fd,'slug'),name:cleanLocalized(localized(fd,'name')),description:cleanLocalized(localized(fd,'description')),price_cents:cents,currency:text(fd,'currency')||'cad',billing_type:text(fd,'billing_type')||'one_time',stripe_price_id:text(fd,'stripe_price_id')||null,active:bool(fd,'active'),sort_order:Number(text(fd,'sort_order')||0),updated_at:new Date().toISOString()};
  const q=id?supabase.from('packages').update(payload).eq('id',id):supabase.from('packages').insert(payload); const {error}=await q;if(error)throw new Error(error.message);done(lang,'pricing');
}
export async function deletePackage(lang:string,fd:FormData){const {supabase}=await adminDb(lang);const {error}=await supabase.from('packages').delete().eq('id',text(fd,'id'));if(error)throw new Error(error.message);done(lang,'pricing')}

export async function updateUserRole(lang:string,fd:FormData){const {supabase}=await adminDb(lang);const id=text(fd,'id');const role=text(fd,'role');if(!['client','trainer','admin'].includes(role))throw new Error('Invalid role');const {error}=await supabase.rpc('admin_set_user_role',{target_user:id,new_role:role});if(error)throw new Error(error.message);done(lang,'clients')}
export async function updateLead(lang:string,fd:FormData){const {supabase}=await adminDb(lang);const {error}=await supabase.from('appointment_requests').update({status:text(fd,'status')}).eq('id',text(fd,'id'));if(error)throw new Error(error.message);done(lang,'leads')}
export async function saveTestimonial(lang:string,fd:FormData){const {supabase}=await adminDb(lang);const id=text(fd,'id');const payload:any={client_name:text(fd,'client_name'),quote:cleanLocalized(localized(fd,'quote')),rating:Number(text(fd,'rating')||5),active:bool(fd,'active'),sort_order:Number(text(fd,'sort_order')||0),updated_at:new Date().toISOString()};const q=id?supabase.from('testimonials').update(payload).eq('id',id):supabase.from('testimonials').insert(payload);const {error}=await q;if(error)throw new Error(error.message);done(lang,'testimonials')}
export async function deleteTestimonial(lang:string,fd:FormData){const {supabase}=await adminDb(lang);const {error}=await supabase.from('testimonials').delete().eq('id',text(fd,'id'));if(error)throw new Error(error.message);done(lang,'testimonials')}

export async function saveExerciseOverride(lang:string,fd:FormData){const {supabase}=await adminDb(lang);const source_id=text(fd,'source_id');const payload={source_id,name:cleanLocalized(localized(fd,'name')),description:cleanLocalized(localized(fd,'description')),active:bool(fd,'active'),featured:bool(fd,'featured'),updated_at:new Date().toISOString()};const {error}=await supabase.from('exercise_overrides').upsert(payload,{onConflict:'source_id'});if(error)throw new Error(error.message);done(lang,'exercises')}
