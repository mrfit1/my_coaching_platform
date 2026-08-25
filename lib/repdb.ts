import type { Locale } from './i18n';
import { getSupabasePublic } from './supabase-public';
import { localized } from './cms';

export const REPDB_BASE_URL = 'https://exercise-dataset.com';
export const REPDB_DATA_URL = `${REPDB_BASE_URL}/exercises.json`;

export type RepDbExercise = {
  id: string;
  display_name?: string;
  display_description?: string;
  name_en: string;
  name_es?: string;
  description_en?: string;
  description_es?: string;
  category?: string;
  force_type?: string;
  mechanic?: string;
  difficulty?: string;
  equipment?: string;
  body_part?: string;
  primary_muscles?: string[];
  secondary_muscles?: string[];
  goals?: string[];
  tags?: string[];
  is_unilateral?: boolean;
  is_bodyweight?: boolean;
  instructions_en?: string[];
  instructions_es?: string[];
  tips_en?: string[];
  tips_es?: string[];
  met?: number;
  images?: { flat?: { start?: string; peak?: string; main?: string } };
};

type RepDbPayload = { count: number; exercises: RepDbExercise[] };

export async function getRepDbExercises(): Promise<RepDbExercise[]> {
  try {
    const res = await fetch(REPDB_DATA_URL, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) return [];
    const data = (await res.json()) as RepDbPayload;
    return Array.isArray(data.exercises) ? data.exercises : [];
  } catch {
    return [];
  }
}

export async function getExerciseLibraryForLocale(lang: Locale): Promise<RepDbExercise[]> {
  const exercises = await getRepDbExercises();
  const db = getSupabasePublic();
  if (!db) return exercises;
  const { data } = await db.from('exercise_overrides').select('source_id,name,description,active');
  if (!data?.length) return exercises;
  const overrides = new Map(data.map((row:any) => [row.source_id, row]));
  return exercises.flatMap((exercise) => {
    const override:any = overrides.get(exercise.id);
    if (override?.active === false) return [];
    return [{
      ...exercise,
      display_name: override ? localized(override.name, lang, '') : undefined,
      display_description: override ? localized(override.description, lang, '') : undefined,
    }];
  });
}

export async function getExerciseForLocale(id: string, lang: Locale) {
  const all = await getExerciseLibraryForLocale(lang);
  return all.find((x) => x.id === id) || null;
}

export function exerciseName(exercise: RepDbExercise, lang: Locale) {
  return exercise.display_name || (lang === 'es' && exercise.name_es ? exercise.name_es : exercise.name_en);
}

export function exerciseDescription(exercise: RepDbExercise, lang: Locale) {
  return exercise.display_description || (lang === 'es' && exercise.description_es ? exercise.description_es : exercise.description_en || '');
}

export function exerciseInstructions(exercise: RepDbExercise, lang: Locale) {
  return lang === 'es' && exercise.instructions_es?.length ? exercise.instructions_es : exercise.instructions_en || [];
}

export function exerciseTips(exercise: RepDbExercise, lang: Locale) {
  return lang === 'es' && exercise.tips_es?.length ? exercise.tips_es : exercise.tips_en || [];
}

export function exerciseImage(path?: string) {
  return path ? `${REPDB_BASE_URL}/${path.replace(/^\//, '')}` : null;
}
