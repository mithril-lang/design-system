export function localeCountry(locale: unknown): string | undefined;
export function applyVisitorLocale(root: Pick<Element, 'setAttribute' | 'removeAttribute'>, locales: readonly string[]): void;
export function acceptLanguageCountry(header: string | null): string | undefined;
