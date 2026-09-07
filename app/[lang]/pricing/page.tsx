import {notFound} from 'next/navigation';
import {getCopy,isLocale,type Locale} from '@/lib/i18n';
import {dynamicMetadata} from '@/lib/seo-db';
import {getSupabasePublic} from '@/lib/supabase-public';
import {localized} from '@/lib/cms';

const PAYMENT_LINKS: Record<number,string> = {
  11500:'https://buy.stripe.com/cNi14fcJ5bUR0lBbBreAg00',
  7900:'https://buy.stripe.com/00w28jcJ5aQN3xNeNDeAg02',
  55000:'https://buy.stripe.com/28E5kvdN9gb72tJeNDeAg03',
  105000:'https://buy.stripe.com/9B6aEP5gD6Ax0lB5d3eAg04',
  198000:'https://buy.stripe.com/6oU4grbF10c9c4j5d3eAg05',
  57600:'https://buy.stripe.com/3cI4gr9wTgb77O36h7eAg06',
  130000:'https://buy.stripe.com/28E7sD24rgb7ecr20ReAg07',
};

const PAY_LABEL: Record<Locale,string> = {
  en:'Pay online',
  fa:'پرداخت آنلاین',
  fr:'Payer en ligne',
  es:'Pagar en línea',
};

export async function generateMetadata({params}:{params:Promise<{lang:string}>}){
  const {lang}=await params;
  return isLocale(lang)?dynamicMetadata(lang,'/pricing'):{};
}

export default async function Pricing({params}:{params:Promise<{lang:string}>}){
  const {lang}=await params;
  if(!isLocale(lang))notFound();
  const l=lang as Locale,t=getCopy(l);
  const supabase=getSupabasePublic();
  let rows:any[]=[];
  if(supabase){
    const {data}=await supabase.from('packages').select('*').eq('active',true).order('sort_order');
    rows=data||[];
  }
  const fallback=t.plans.map(([name,price,desc,cta])=>({
    name:{[l]:name},
    description:{[l]:desc},
    price_label:price,
    cta
  }));
  const items=rows.length?rows:fallback;

  return <>
    <section className="page-hero">
      <div className="container">
        <div className="kicker">PRICING</div>
        <h1>{t.pricingTitle}</h1>
        <p className="lead">{t.pricingBody}</p>
      </div>
    </section>
    <section className="section">
      <div className="container pricing-grid">
        {items.map((p:any,i:number)=>{
          const paymentLink=p.price_cents!=null?PAYMENT_LINKS[p.price_cents]:undefined;
          return <div className="price-card" key={p.id||i}>
            <h2>{localized(p.name,l,p.name?.[l]||'Coaching')}</h2>
            <div className="price">
              {p.price_cents!=null
                ?(p.price_cents/100).toLocaleString(l==='en'?'en-CA':l,{style:'currency',currency:(p.currency||'CAD').toUpperCase()})
                :p.price_label}
            </div>
            <p>{localized(p.description,l,p.description?.[l]||'')}</p>
            {paymentLink
              ?<a className="btn" href={paymentLink}>{PAY_LABEL[l]}</a>
              :<a className="btn" href={`/${l}/contact`}>{p.cta||'Get started'}</a>}
          </div>
        })}
      </div>
    </section>
  </>;
}
