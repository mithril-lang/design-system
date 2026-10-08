/** Preserve explicit BCP 47 region; never infer a country from a language. */
export function localeCountry(locale) {
  if (typeof locale !== 'string') return undefined;
  try {
    return new Intl.Locale(locale.replaceAll('_', '-')).region;
  } catch {
    return undefined;
  }
}

/** Highest-priority browser/OS locale, independent of the translation choice. */
export function applyVisitorLocale(root, locales) {
  const locale = locales?.[0];
  const country = localeCountry(locale);
  if (country) root.setAttribute('data-font-country', country);
  else root.removeAttribute('data-font-country');
  if (typeof locale === 'string') root.setAttribute('data-visitor-locale', locale);
  else root.removeAttribute('data-visitor-locale');
}

/** Match Accept-Language preference order without collapsing regional tags. */
export function acceptLanguageCountry(header) {
  const entries = (header ?? '').split(',').map((part, index) => {
    const [tag, ...params] = part.trim().split(';');
    const parameter = params.find(p => p.trim().startsWith('q='));
    const q = parameter === undefined ? 1 : Number(parameter.trim().slice(2));
    return {tag: tag.trim(), q, index};
  }).filter(e => e.tag !== '*' && e.q > 0 && e.q <= 1)
    .sort((a,b) => b.q - a.q || a.index - b.index);
  for (const {tag} of entries) {
    try { return new Intl.Locale(tag.replaceAll('_', '-')).region; }
    catch { /* malformed preferences do not select a country */ }
  }
  return undefined;
}
