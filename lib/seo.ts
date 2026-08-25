import type { Metadata } from 'next';
import type { Locale } from './i18n';

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost.replace(/^https?:\/\//, '').replace(/\/$/, '')}`;

  return 'http://localhost:3000';
}

export const siteUrl = resolveSiteUrl();
export const brandName =
  process.env.NEXT_PUBLIC_BRAND_NAME || 'Toronto Performance Coaching';

const baseSeo: Record<Locale, Record<string, [string, string]>> = {
  en: {
    home: [
      'Personal Trainer Toronto | In-Home & Online Fitness Coaching',
      'Personal training in Toronto plus worldwide online fitness coaching, personalized workout programs, progress tracking and practical nutrition support.',
    ],
    services: [
      'Personal Training Services Toronto | Home, Private & Online Coaching',
      'Explore in-home personal training, private coaching, online fitness coaching, workout programming and nutrition support in Toronto.',
    ],
    about: [
      'About Our Toronto Fitness Coaching | Hassan Golestaneh',
      'Meet founder and lead coach Hassan Golestaneh and learn about the coaching philosophy behind this Toronto personal training platform.',
    ],
    pricing: [
      'Personal Training Pricing Toronto | Coaching Options',
      'Explore consultation, personal training and monthly coaching options in Toronto, with online and flexible payment support.',
    ],
    contact: [
      'Book a Personal Training Consultation Toronto',
      'Request a personal training consultation in Toronto for in-home, private or online fitness coaching.',
    ],
    location: [
      'Personal Trainer Toronto Ontario | Local In-Home & Online Coaching',
      'Toronto personal training with in-home, private and online coaching across the city and selected GTA areas.',
    ],
  },
  fa: {
    home: [
      'مربی خصوصی در تورنتو | پرسنال ترینینگ در منزل و آنلاین',
      'پرسنال ترینینگ حضوری در تورنتو و کوچینگ آنلاین و برنامه تمرینی شخصی برای افراد در سراسر دنیا.',
    ],
    services: [
      'خدمات پرسنال ترینینگ در تورنتو | منزل، خصوصی و آنلاین',
      'پرسنال ترینینگ در منزل و فضای خصوصی، کوچینگ آنلاین، برنامه تمرینی و راهنمایی تغذیه در تورنتو.',
    ],
    about: [
      'درباره مربیگری فیتنس در تورنتو | حسن گلستانه',
      'آشنایی با حسن گلستانه، بنیان‌گذار و مربی ارشد، و سابقه او در فیتنس، مربیگری و مسابقات بین‌المللی.',
    ],
    pricing: [
      'هزینه پرسنال ترینینگ در تورنتو | گزینه‌های کوچینگ',
      'گزینه‌های مشاوره، جلسه خصوصی و کوچینگ ماهانه در تورنتو با امکان پرداخت آنلاین یا حضوری.',
    ],
    contact: [
      'رزرو مشاوره پرسنال ترینینگ در تورنتو',
      'برای پرسنال ترینینگ در منزل، خصوصی یا آنلاین در تورنتو درخواست مشاوره ارسال کنید.',
    ],
    location: [
      'مربی خصوصی تورنتو انتاریو | تمرین در منزل و آنلاین',
      'پرسنال ترینینگ در تورنتو و برخی مناطق GTA با گزینه‌های تمرین در منزل، خصوصی و آنلاین.',
    ],
  },
  fr: {
    home: [
      'Entraîneur personnel Toronto | À domicile & coaching en ligne',
      'Entraînement personnel à Toronto et coaching fitness en ligne disponible partout dans le monde, avec programmes personnalisés et suivi.',
    ],
    services: [
      'Services d’entraînement personnel Toronto | Domicile, privé et en ligne',
      'Services de coaching à Toronto : entraînement à domicile, séances privées, coaching en ligne, programmation et nutrition.',
    ],
    about: [
      'À propos de notre coaching fitness à Toronto | Hassan Golestaneh',
      'Découvrez Hassan Golestaneh, fondateur et coach principal, et l’approche de coaching de la plateforme.',
    ],
    pricing: [
      'Tarifs entraînement personnel Toronto | Options de coaching',
      'Options de consultation, séances individuelles et coaching mensuel à Toronto.',
    ],
    contact: [
      'Réserver une consultation fitness à Toronto',
      'Demandez une consultation pour du coaching à domicile, privé ou en ligne à Toronto.',
    ],
    location: [
      'Entraîneur personnel Toronto Ontario | Coaching local',
      'Coaching personnel à Toronto avec séances à domicile, privées ou en ligne dans la ville et certains secteurs du GTA.',
    ],
  },
  es: {
    home: [
      'Entrenador personal Toronto | A domicilio y coaching online',
      'Entrenamiento personal en Toronto y coaching fitness online disponible en todo el mundo, con programas personalizados y seguimiento.',
    ],
    services: [
      'Servicios de entrenamiento personal Toronto | Casa, privado y online',
      'Entrenamiento a domicilio, sesiones privadas, coaching online, programación y apoyo nutricional en Toronto.',
    ],
    about: [
      'Sobre nuestro coaching fitness en Toronto | Hassan Golestaneh',
      'Conoce a Hassan Golestaneh, fundador y coach principal, y la filosofía de coaching de la plataforma.',
    ],
    pricing: [
      'Precios de entrenador personal Toronto | Opciones de coaching',
      'Opciones de consulta, entrenamiento individual y coaching mensual en Toronto.',
    ],
    contact: [
      'Reservar consulta de entrenamiento personal Toronto',
      'Solicita una consulta para entrenamiento a domicilio, privado u online en Toronto.',
    ],
    location: [
      'Entrenador personal Toronto Ontario | Coaching local',
      'Entrenamiento personal en Toronto con opciones a domicilio, privadas y online en la ciudad y zonas seleccionadas del GTA.',
    ],
  },
};

export function localeMetadata(lang: Locale, path = ''): Metadata {
  const key =
    path === '/services'
      ? 'services'
      : path === '/about'
        ? 'about'
        : path === '/pricing'
          ? 'pricing'
          : path === '/contact'
            ? 'contact'
            : path === '/locations/toronto'
              ? 'location'
              : 'home';

  const [title, description] = baseSeo[lang][key];
  const base = `/${lang}${path}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: base,
      languages: {
        'en-CA': `/en${path}`,
        fa: `/fa${path}`,
        'fr-CA': `/fr${path}`,
        es: `/es${path}`,
        'x-default': `/en${path}`,
      },
    },
    openGraph: {
      type: 'website',
      locale:
        lang === 'fa' ? 'fa_IR' : lang === 'fr' ? 'fr_CA' : lang === 'es' ? 'es_ES' : 'en_CA',
      url: base,
      title,
      description,
      siteName: brandName,
      images: [
        {
          url: '/images/founder.jpg',
          width: 1200,
          height: 630,
          alt: 'Fitness coaching in Toronto',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/founder.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export function organizationJsonLd(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: brandName,
        url: siteUrl,
        founder: { '@id': `${siteUrl}/#hassan-golestaneh` },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#hassan-golestaneh`,
        name: 'Hassan Golestaneh',
        jobTitle: 'Fitness Coach',
        image: `${siteUrl}/images/founder.jpg`,
        url: `${siteUrl}/${lang}/about`,
        sameAs: [
          'https://en.wikipedia.org/wiki/Hassan_Golestaneh',
          'https://www.imdb.com/name/nm13963676/',
          'https://www.instagram.com/mrsportmodel/',
        ],
      },
      {
        '@type': ['LocalBusiness', 'SportsActivityLocation'],
        '@id': `${siteUrl}/#business`,
        name: brandName,
        url: siteUrl,
        priceRange: '$$',
        areaServed: [
          { '@type': 'City', name: 'Toronto' },
          { '@type': 'AdministrativeArea', name: 'Greater Toronto Area' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Toronto',
          addressRegion: 'ON',
          addressCountry: 'CA',
        },
        founder: { '@id': `${siteUrl}/#hassan-golestaneh` },
        knowsLanguage: ['en', 'fa', 'fr', 'es'],
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/#online-coaching`,
        name: 'Online fitness coaching and personalized training programs',
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: { '@type': 'Place', name: 'Worldwide' },
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: `${siteUrl}/${lang}/services/online-fitness-coaching` },
        availableLanguage: ['English','Persian','French','Spanish'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: brandName,
        inLanguage: ['en-CA', 'fa', 'fr-CA', 'es'],
        publisher: { '@id': `${siteUrl}/#organization` },
      },
    ],
  };
}
