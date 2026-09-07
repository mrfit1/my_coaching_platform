import Link from 'next/link';
import {notFound} from 'next/navigation';
import {isLocale,type Locale} from '@/lib/i18n';
import {dynamicMetadata} from '@/lib/seo-db';

import {PAYMENT_LINKS} from '@/lib/payment-links';


type Plan = {
  name: string;
  price: string;
  detail: string;
  href: string;
  cta: string;
  group: 'inPerson' | 'online' | 'consultation';
};

type PricingCopy = {
  kicker: string;
  title: string;
  body: string;
  inPerson: string;
  online: string;
  consultation: string;
  taxNote: string;
  plans: Plan[];
};

const pricingCopy: Record<Locale,PricingCopy> = {
  en: {
    kicker: 'PRICING',
    title: 'Personal Training & Live Video Coaching',
    body: 'Choose the format and package that fits your goals. All prices are in Canadian dollars.',
    inPerson: 'In-Person / In-Home Personal Training',
    online: 'Live Video Coaching',
    consultation: 'Free Consultation',
    taxNote: 'Applicable taxes are calculated securely at checkout.',
    plans: [
      {name:'Free Consultation',price:'CA$0',detail:'Short consultation to discuss your goals and the best starting option.',href:'/contact',cta:'Book free consultation',group:'consultation'},
      {name:'Personal Training — 1 Session',price:'CA$115',detail:'1 private in-person session · CA$115/session',href:PAYMENT_LINKS.inPerson1,cta:'Pay online',group:'inPerson'},
      {name:'Personal Training — 5 Sessions',price:'CA$550',detail:'5 private in-person sessions · CA$110/session',href:PAYMENT_LINKS.inPerson5,cta:'Pay online',group:'inPerson'},
      {name:'Personal Training — 10 Sessions',price:'CA$1,050',detail:'10 private in-person sessions · CA$105/session',href:PAYMENT_LINKS.inPerson10,cta:'Pay online',group:'inPerson'},
      {name:'Personal Training — 20 Sessions',price:'CA$1,980',detail:'20 private in-person sessions · CA$99/session',href:PAYMENT_LINKS.inPerson20,cta:'Pay online',group:'inPerson'},
      {name:'Live Video Coaching — 1 Session',price:'CA$79',detail:'1 personalized live video coaching session · CA$79/session',href:PAYMENT_LINKS.liveVideo1,cta:'Pay online',group:'online'},
      {name:'Live Video Coaching — 8 Sessions',price:'CA$576',detail:'8 personalized live video coaching sessions · CA$72/session',href:PAYMENT_LINKS.liveVideo8,cta:'Pay online',group:'online'},
      {name:'Live Video Coaching — 20 Sessions',price:'CA$1,300',detail:'20 personalized live video coaching sessions · CA$65/session',href:PAYMENT_LINKS.liveVideo20,cta:'Pay online',group:'online'},
    ],
  },
  fa: {
    kicker: 'قیمت‌ها',
    title: 'پرسنال ترینینگ و کوچینگ ویدیویی زنده',
    body: 'مدل تمرین و پکیج مناسب هدفتان را انتخاب کنید. همه قیمت‌ها به دلار کانادا هستند.',
    inPerson: 'پرسنال ترینینگ حضوری / در منزل',
    online: 'کوچینگ ویدیویی زنده',
    consultation: 'مشاوره رایگان',
    taxNote: 'مالیات قابل اعمال به‌صورت امن هنگام پرداخت محاسبه می‌شود.',
    plans: [
      {name:'مشاوره رایگان',price:'CA$0',detail:'مشاوره کوتاه برای بررسی هدف و انتخاب بهترین نقطه شروع.',href:'/contact',cta:'رزرو مشاوره رایگان',group:'consultation'},
      {name:'پرسنال ترینینگ — ۱ جلسه',price:'CA$115',detail:'۱ جلسه خصوصی حضوری · هر جلسه ۱۱۵ دلار',href:PAYMENT_LINKS.inPerson1,cta:'پرداخت آنلاین',group:'inPerson'},
      {name:'پرسنال ترینینگ — ۵ جلسه',price:'CA$550',detail:'۵ جلسه خصوصی حضوری · هر جلسه ۱۱۰ دلار',href:PAYMENT_LINKS.inPerson5,cta:'پرداخت آنلاین',group:'inPerson'},
      {name:'پرسنال ترینینگ — ۱۰ جلسه',price:'CA$1,050',detail:'۱۰ جلسه خصوصی حضوری · هر جلسه ۱۰۵ دلار',href:PAYMENT_LINKS.inPerson10,cta:'پرداخت آنلاین',group:'inPerson'},
      {name:'پرسنال ترینینگ — ۲۰ جلسه',price:'CA$1,980',detail:'۲۰ جلسه خصوصی حضوری · هر جلسه ۹۹ دلار',href:PAYMENT_LINKS.inPerson20,cta:'پرداخت آنلاین',group:'inPerson'},
      {name:'کوچینگ ویدیویی زنده — ۱ جلسه',price:'CA$79',detail:'۱ جلسه کوچینگ ویدیویی شخصی · هر جلسه ۷۹ دلار',href:PAYMENT_LINKS.liveVideo1,cta:'پرداخت آنلاین',group:'online'},
      {name:'کوچینگ ویدیویی زنده — ۸ جلسه',price:'CA$576',detail:'۸ جلسه کوچینگ ویدیویی شخصی · هر جلسه ۷۲ دلار',href:PAYMENT_LINKS.liveVideo8,cta:'پرداخت آنلاین',group:'online'},
      {name:'کوچینگ ویدیویی زنده — ۲۰ جلسه',price:'CA$1,300',detail:'۲۰ جلسه کوچینگ ویدیویی شخصی · هر جلسه ۶۵ دلار',href:PAYMENT_LINKS.liveVideo20,cta:'پرداخت آنلاین',group:'online'},
    ],
  },
  fr: {
    kicker: 'TARIFS',
    title: 'Entraînement personnel et coaching vidéo en direct',
    body: 'Choisissez le format et le forfait adaptés à vos objectifs. Tous les prix sont en dollars canadiens.',
    inPerson: 'Entraînement personnel en personne / à domicile',
    online: 'Coaching vidéo en direct',
    consultation: 'Consultation gratuite',
    taxNote: 'Les taxes applicables sont calculées de façon sécurisée au paiement.',
    plans: [
      {name:'Consultation gratuite',price:'CA$0',detail:'Courte consultation pour discuter de vos objectifs et du meilleur point de départ.',href:'/contact',cta:'Réserver gratuitement',group:'consultation'},
      {name:'Entraînement personnel — 1 séance',price:'CA$115',detail:'1 séance privée en personne · 115 $ CA/séance',href:PAYMENT_LINKS.inPerson1,cta:'Payer en ligne',group:'inPerson'},
      {name:'Entraînement personnel — 5 séances',price:'CA$550',detail:'5 séances privées · 110 $ CA/séance',href:PAYMENT_LINKS.inPerson5,cta:'Payer en ligne',group:'inPerson'},
      {name:'Entraînement personnel — 10 séances',price:'CA$1,050',detail:'10 séances privées · 105 $ CA/séance',href:PAYMENT_LINKS.inPerson10,cta:'Payer en ligne',group:'inPerson'},
      {name:'Entraînement personnel — 20 séances',price:'CA$1,980',detail:'20 séances privées · 99 $ CA/séance',href:PAYMENT_LINKS.inPerson20,cta:'Payer en ligne',group:'inPerson'},
      {name:'Coaching vidéo en direct — 1 séance',price:'CA$79',detail:'1 séance vidéo personnalisée · 79 $ CA/séance',href:PAYMENT_LINKS.liveVideo1,cta:'Payer en ligne',group:'online'},
      {name:'Coaching vidéo en direct — 8 séances',price:'CA$576',detail:'8 séances vidéo personnalisées · 72 $ CA/séance',href:PAYMENT_LINKS.liveVideo8,cta:'Payer en ligne',group:'online'},
      {name:'Coaching vidéo en direct — 20 séances',price:'CA$1,300',detail:'20 séances vidéo personnalisées · 65 $ CA/séance',href:PAYMENT_LINKS.liveVideo20,cta:'Payer en ligne',group:'online'},
    ],
  },
  es: {
    kicker: 'PRECIOS',
    title: 'Entrenamiento personal y coaching por video en vivo',
    body: 'Elige el formato y paquete que mejor se adapte a tus objetivos. Todos los precios están en dólares canadienses.',
    inPerson: 'Entrenamiento personal presencial / a domicilio',
    online: 'Coaching por video en vivo',
    consultation: 'Consulta gratuita',
    taxNote: 'Los impuestos aplicables se calculan de forma segura al pagar.',
    plans: [
      {name:'Consulta gratuita',price:'CA$0',detail:'Consulta breve para hablar de tus objetivos y elegir el mejor punto de partida.',href:'/contact',cta:'Reservar consulta gratis',group:'consultation'},
      {name:'Entrenamiento personal — 1 sesión',price:'CA$115',detail:'1 sesión privada presencial · 115 CAD/sesión',href:PAYMENT_LINKS.inPerson1,cta:'Pagar en línea',group:'inPerson'},
      {name:'Entrenamiento personal — 5 sesiones',price:'CA$550',detail:'5 sesiones privadas · 110 CAD/sesión',href:PAYMENT_LINKS.inPerson5,cta:'Pagar en línea',group:'inPerson'},
      {name:'Entrenamiento personal — 10 sesiones',price:'CA$1,050',detail:'10 sesiones privadas · 105 CAD/sesión',href:PAYMENT_LINKS.inPerson10,cta:'Pagar en línea',group:'inPerson'},
      {name:'Entrenamiento personal — 20 sesiones',price:'CA$1,980',detail:'20 sesiones privadas · 99 CAD/sesión',href:PAYMENT_LINKS.inPerson20,cta:'Pagar en línea',group:'inPerson'},
      {name:'Coaching por video — 1 sesión',price:'CA$79',detail:'1 sesión personalizada por video · 79 CAD/sesión',href:PAYMENT_LINKS.liveVideo1,cta:'Pagar en línea',group:'online'},
      {name:'Coaching por video — 8 sesiones',price:'CA$576',detail:'8 sesiones personalizadas por video · 72 CAD/sesión',href:PAYMENT_LINKS.liveVideo8,cta:'Pagar en línea',group:'online'},
      {name:'Coaching por video — 20 sesiones',price:'CA$1,300',detail:'20 sesiones personalizadas por video · 65 CAD/sesión',href:PAYMENT_LINKS.liveVideo20,cta:'Pagar en línea',group:'online'},
    ],
  },
};

export async function generateMetadata({params}:{params:Promise<{lang:string}>}){
  const {lang}=await params;
  return isLocale(lang)?dynamicMetadata(lang,'/pricing'):{};
}

export default async function Pricing({params}:{params:Promise<{lang:string}>}){
  const {lang}=await params;
  if(!isLocale(lang))notFound();
  const l=lang as Locale;
  const copy=pricingCopy[l];
  const consultation=copy.plans.filter(p=>p.group==='consultation');
  const inPerson=copy.plans.filter(p=>p.group==='inPerson');
  const online=copy.plans.filter(p=>p.group==='online');

  const renderCards=(plans:Plan[]) => (
    <div className="pricing-grid">
      {plans.map((p)=><article className="price-card" key={p.name}>
        <h2>{p.name}</h2>
        <div className="price">{p.price}</div>
        <p>{p.detail}</p>
        {p.group==='consultation'
          ?<Link className="btn" href={`/${l}${p.href}`}>{p.cta}</Link>
          :<a className="btn" href={p.href} target="_blank" rel="noopener noreferrer">{p.cta}</a>}
      </article>)}
    </div>
  );

  const offers=copy.plans.filter(p=>p.group!=='consultation').map((p)=>({
    '@type':'Offer',
    name:p.name,
    price:p.price.replace(/[^0-9.]/g,''),
    priceCurrency:'CAD',
    url:p.href,
    availability:'https://schema.org/InStock',
  }));

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
      '@context':'https://schema.org',
      '@type':'OfferCatalog',
      name:copy.title,
      itemListElement:offers,
    })}}/>
    <section className="page-hero">
      <div className="container">
        <div className="kicker">{copy.kicker}</div>
        <h1>{copy.title}</h1>
        <p className="lead">{copy.body}</p>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="section-head"><h2>{copy.consultation}</h2></div>
        {renderCards(consultation)}
      </div>
    </section>
    <section className="section soft">
      <div className="container">
        <div className="section-head"><h2>{copy.inPerson}</h2></div>
        {renderCards(inPerson)}
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="section-head"><h2>{copy.online}</h2></div>
        {renderCards(online)}
        <p style={{marginTop:'24px',opacity:.75}}>{copy.taxNote}</p>
      </div>
    </section>
  </>;
}
