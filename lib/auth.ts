import { redirect } from 'next/navigation';
import { getSupabaseServer } from './supabase-server';

export type AppRole = 'client' | 'trainer' | 'admin';

export async function getCurrentUser() {
  const supabase = await getSupabaseServer();
  if (!supabase) return { supabase: null, user: null, profile: null };
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, profile: null };
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();
  return { supabase, user, profile };
}

export async function requireUser(lang: string) {
  const ctx = await getCurrentUser();
  if (!ctx.user) redirect(`/${lang}/login`);
  return ctx as typeof ctx & { user: NonNullable<typeof ctx.user> };
}

export async function requireRole(lang: string, allowed: AppRole[]) {
  const ctx = await requireUser(lang);
  const role = (ctx.profile?.role || 'client') as AppRole;
  if (!allowed.includes(role)) redirect(`/${lang}/dashboard`);
  return { ...ctx, role };
}
