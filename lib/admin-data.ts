import { requireRole } from './auth';

export async function adminDb(lang: string) {
  const { supabase, user } = await requireRole(lang, ['admin']);
  if (!supabase) throw new Error('Supabase is not configured.');
  return { supabase, user };
}

export async function trainerDb(lang: string) {
  const { supabase, user, role } = await requireRole(lang, ['admin', 'trainer']);
  if (!supabase) throw new Error('Supabase is not configured.');
  return { supabase, user, role };
}
