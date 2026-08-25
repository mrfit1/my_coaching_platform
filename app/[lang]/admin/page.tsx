import { adminDb } from '@/lib/admin-data';

export default async function AdminHome({params}:{params:Promise<{lang:string}>}){
  const {lang}=await params; const {supabase}=await adminDb(lang);
  const [clients,bookings,trainers,plans]=await Promise.all([
    supabase.from('profiles').select('*',{count:'exact',head:true}).eq('role','client'),
    supabase.from('appointments').select('*',{count:'exact',head:true}).in('status',['requested','confirmed']),
    supabase.from('trainer_profiles').select('*',{count:'exact',head:true}).eq('active',true),
    supabase.from('training_plans').select('*',{count:'exact',head:true}).eq('status','active'),
  ]);
  return <div className="admin-content"><div className="metric-grid">
    <div className="metric"><strong>{clients.count||0}</strong><span>Clients</span></div>
    <div className="metric"><strong>{bookings.count||0}</strong><span>Open bookings</span></div>
    <div className="metric"><strong>{trainers.count||0}</strong><span>Active trainers</span></div>
    <div className="metric"><strong>{plans.count||0}</strong><span>Active plans</span></div>
  </div><div className="panel"><h2>Control center</h2><p>Manage public content, services, trainers, clients, bookings, coaching plans, multilingual SEO and site settings without changing code.</p></div></div>
}
