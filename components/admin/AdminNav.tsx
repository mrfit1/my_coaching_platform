import Link from 'next/link';

const items = [
  ['Overview',''],['Content','content'],['Services','services'],['Pricing','pricing'],['Trainers','trainers'],['Clients','clients'],
  ['Leads','leads'],['Bookings','bookings'],['Plans','plans'],['Exercises','exercises'],['Testimonials','testimonials'],['SEO','seo'],['Settings','settings']
] as const;

export default function AdminNav({lang}:{lang:string}) {
  return <nav className="admin-nav" aria-label="Admin navigation">
    {items.map(([label,path]) => <Link key={label} href={`/${lang}/admin${path ? `/${path}` : ''}`}>{label}</Link>)}
  </nav>;
}
