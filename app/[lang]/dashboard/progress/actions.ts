'use server';
import {revalidatePath} from 'next/cache';import {requireUser} from '@/lib/auth';
export async function addProgress(lang:string,fd:FormData){const {supabase,user}=await requireUser(lang);const metric=String(fd.get('metric')||'').trim();const value=Number(fd.get('value'));const unit=String(fd.get('unit')||'').trim();const note=String(fd.get('note')||'').trim();if(!metric||!Number.isFinite(value))return;await supabase!.from('progress_entries').insert({client_id:user.id,metric,value,unit,note});revalidatePath(`/${lang}/dashboard/progress`)}
