'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { RepDbExercise } from '@/lib/repdb';
import { exerciseImage } from '@/lib/repdb';

type Props = { exercises: RepDbExercise[]; lang: 'en'|'fa'|'fr'|'es' };

const ui = {
  en:{search:'Search exercises',allBody:'All body parts',allEquipment:'All equipment',allLevels:'All levels',results:'exercises',view:'View exercise'},
  fa:{search:'جستجوی حرکت',allBody:'همه عضلات',allEquipment:'همه تجهیزات',allLevels:'همه سطوح',results:'حرکت',view:'مشاهده حرکت'},
  fr:{search:'Rechercher un exercice',allBody:'Toutes les zones',allEquipment:'Tout équipement',allLevels:'Tous niveaux',results:'exercices',view:'Voir l’exercice'},
  es:{search:'Buscar ejercicios',allBody:'Todas las zonas',allEquipment:'Todo el equipo',allLevels:'Todos los niveles',results:'ejercicios',view:'Ver ejercicio'},
} as const;

function pretty(v?: string){return (v||'').replaceAll('_',' ').replace(/\b\w/g,m=>m.toUpperCase())}

export default function ExerciseLibrary({exercises,lang}:Props){
  const t=ui[lang]; const [q,setQ]=useState(''); const [body,setBody]=useState(''); const [equipment,setEquipment]=useState(''); const [difficulty,setDifficulty]=useState('');
  const bodies=useMemo(()=>[...new Set(exercises.map(x=>x.body_part).filter(Boolean) as string[])].sort(),[exercises]);
  const equipmentOptions=useMemo(()=>[...new Set(exercises.map(x=>x.equipment|| (x.is_bodyweight?'bodyweight':'')).filter(Boolean))].sort(),[exercises]);
  const levels=useMemo(()=>[...new Set(exercises.map(x=>x.difficulty).filter(Boolean) as string[])].sort(),[exercises]);
  const filtered=useMemo(()=>exercises.filter(x=>{const text=`${x.name_en} ${x.name_es||''} ${x.body_part||''} ${x.equipment||''} ${(x.primary_muscles||[]).join(' ')}`.toLowerCase();return (!q||text.includes(q.toLowerCase()))&&(!body||x.body_part===body)&&(!equipment||(x.equipment|| (x.is_bodyweight?'bodyweight':''))===equipment)&&(!difficulty||x.difficulty===difficulty)}),[exercises,q,body,equipment,difficulty]);
  return <>
    <div className="exercise-filters"><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t.search} aria-label={t.search}/><select value={body} onChange={e=>setBody(e.target.value)}><option value="">{t.allBody}</option>{bodies.map(v=><option key={v} value={v}>{pretty(v)}</option>)}</select><select value={equipment} onChange={e=>setEquipment(e.target.value)}><option value="">{t.allEquipment}</option>{equipmentOptions.map(v=><option key={v} value={v}>{pretty(v)}</option>)}</select><select value={difficulty} onChange={e=>setDifficulty(e.target.value)}><option value="">{t.allLevels}</option>{levels.map(v=><option key={v} value={v}>{pretty(v)}</option>)}</select></div>
    <p className="muted exercise-count">{filtered.length} {t.results}</p>
    <div className="exercise-grid">{filtered.map(ex=>{const img=exerciseImage(ex.images?.flat?.main||ex.images?.flat?.peak||ex.images?.flat?.start);const name=ex.display_name||(lang==='es'&&ex.name_es?ex.name_es:ex.name_en);return <Link className="exercise-card" key={ex.id} href={`/${lang}/exercises/${ex.id}`}>{img?<Image src={img} alt={name} width={512} height={512} loading="lazy" sizes="(max-width:620px) 50vw, (max-width:1000px) 33vw, 20vw"/>:<div className="exercise-placeholder"/>}<div className="exercise-card-body"><h2>{name}</h2><div className="exercise-meta"><span>{pretty(ex.body_part)}</span><span>{pretty(ex.difficulty)}</span></div><span className="text-link">{t.view} →</span></div></Link>})}</div>
  </>;
}
