import Link from 'next/link';
import { getCopy, locales, type Locale } from '@/lib/i18n';
import { getSiteSettings } from '@/lib/cms';

export default async function Header({ lang }: { lang: Locale }) {
  const t = getCopy(lang);
  const settings = await getSiteSettings();
  const brand =
    (typeof settings.brand_name === 'string' && settings.brand_name) ||
    process.env.NEXT_PUBLIC_BRAND_NAME ||
    'Toronto Performance Coaching';

  const links = [
    [`/${lang}/services`, t.services],
    [`/${lang}/exercises`, t.exercises],
    [`/${lang}/about`, t.about],
    [`/${lang}/pricing`, t.pricing],
    [`/${lang}/contact`, t.contact],
  ] as const;

  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href={`/${lang}`} aria-label={`${brand} home`}>
          <span className="brand-mark">TP</span>
          <span className="brand-name">{brand}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions desktop-actions">
          <div className="langs" aria-label="Language selector">
            {locales.map((locale) => (
              <Link
                key={locale}
                className={locale === lang ? 'active' : ''}
                href={`/${locale}`}
                hrefLang={locale}
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link className="btn small" href={`/${lang}/login`}>
            {t.login}
          </Link>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">
            <span className="hamburger" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="sr-only">Menu</span>
          </summary>
          <div className="mobile-menu-panel">
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {links.map(([href, label]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mobile-langs" aria-label="Language selector">
              {locales.map((locale) => (
                <Link
                  key={locale}
                  className={locale === lang ? 'active' : ''}
                  href={`/${locale}`}
                  hrefLang={locale}
                >
                  {locale.toUpperCase()}
                </Link>
              ))}
            </div>
            <Link className="btn mobile-login" href={`/${lang}/login`}>
              {t.login}
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
