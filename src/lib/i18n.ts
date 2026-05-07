export const LOCALES = {
  ES: 'es',
  EN: 'en',
} as const;

export type Locale = (typeof LOCALES)[keyof typeof LOCALES];

export const OTHER_LOCALE: Record<Locale, Locale> = {
  es: 'en',
  en: 'es',
};

export const DEFAULT_LOCALE: Locale = 'es';

export function getTranslatedPath(currentPath: string, from: Locale, to: Locale): string {
  const withFallback = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
  const url = new URL(withFallback, 'https://portfolio.local');
  const pattern = new RegExp(`^/${from}(?=/|$)`);
  const pathname = url.pathname;

  if (pattern.test(pathname)) {
    const translatedPathname = pathname.replace(pattern, `/${to}`) || `/${to}`;

    return `${translatedPathname}${url.search}${url.hash}`;
  }

  if (pathname === '/') {
    return `/${to}${url.search}${url.hash}`;
  }

  return `/${to}${pathname}${url.search}${url.hash}`;
}

export function toDefaultLocaleRoot(path: string, locale: Locale): string {
  if (locale !== DEFAULT_LOCALE) {
    return path;
  }

  const normalized = path.replace(/^\/es(?=$|[?#])/, '');

  if (normalized === '') {
    return '/';
  }

  if (normalized.startsWith('#') || normalized.startsWith('?')) {
    return `/${normalized}`;
  }

  return normalized;
}
