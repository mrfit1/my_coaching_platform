import {createClient} from '@supabase/supabase-js';

/** Anonymous, cookie-free client for public CMS/catalog reads. */
export function getSupabasePublic(){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if(!url||!key)return null;
  return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
}
