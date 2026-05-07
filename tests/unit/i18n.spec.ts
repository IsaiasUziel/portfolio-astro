import { describe, expect, it } from 'vitest';

import { getTranslatedPath, toDefaultLocaleRoot } from '../../src/lib/i18n';

describe('getTranslatedPath', () => {
  it('changes locale for canonical localized route', () => {
    expect(getTranslatedPath('/es/resume', 'es', 'en')).toBe('/en/resume');
    expect(getTranslatedPath('/en/projects', 'en', 'es')).toBe('/es/projects');
  });

  it('preserves querystring and hash fragment', () => {
    expect(getTranslatedPath('/es#contact', 'es', 'en')).toBe('/en#contact');
    expect(getTranslatedPath('/es/projects?source=nav#contact', 'es', 'en')).toBe('/en/projects?source=nav#contact');
  });

  it('adds target locale when incoming path is not localized', () => {
    expect(getTranslatedPath('/resume', 'es', 'en')).toBe('/en/resume');
    expect(getTranslatedPath('/', 'es', 'en')).toBe('/en');
  });

  it('maps spanish home aliases to default root', () => {
    expect(toDefaultLocaleRoot('/es', 'es')).toBe('/');
    expect(toDefaultLocaleRoot('/es#contact', 'es')).toBe('/#contact');
    expect(toDefaultLocaleRoot('/es?utm=nav', 'es')).toBe('/?utm=nav');
    expect(toDefaultLocaleRoot('/es/resume', 'es')).toBe('/es/resume');
    expect(toDefaultLocaleRoot('/en', 'en')).toBe('/en');
  });
});
