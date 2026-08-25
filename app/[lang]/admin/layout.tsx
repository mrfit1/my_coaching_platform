import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import { requireRole } from '@/lib/auth';
import AdminNav from '@/components/admin/AdminNav';

export const dynamic='force-dynamic';
export const metadata={title:'Admin Portal',robots:{index:false,follow:false}};

export default async function AdminLayout({children,params}:{children:React.ReactNode;params:Promise<{lang:string}>}){
  const {lang}=await params; if(!isLocale(lang))notFound();
  await requireRole(lang,['admin']);
  return <section className="admin-shell"><div className="container"><div className="admin-top"><div><div className="kicker">OPERATIONS</div><h1>Admin Portal</h1></div><a className="btn secondary small" href={`/${lang}`}>View site</a></div><AdminNav lang={lang}/>{children}</div></section>
}
