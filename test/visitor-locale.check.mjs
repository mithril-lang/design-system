import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { localeCountry, applyVisitorLocale } from '../resources/visitor-locale.js';
test('region survives language/script and Unicode extensions without maximization', () => {
  for (const [tag, region] of [['en-US','US'], ['en-GB','GB'], ['pt-BR','BR'], ['pt-PT','PT'], ['en-JP','JP'], ['zh-Hant-TW-u-nu-hanidec','TW'], ['ja_JP','JP']]) assert.equal(localeCountry(tag), region);
  for (const tag of ['en','pt','ja','zh-Hant','invalid locale',null]) assert.equal(localeCountry(tag), undefined);
});
test('visitor country is independent of display language and clears stale state', () => {
  const attributes = new Map([['lang', 'ja']]);
  const root = {setAttribute: (k,v) => attributes.set(k,v), removeAttribute: k => attributes.delete(k)};
  applyVisitorLocale(root, ['en-US','en-GB']);
  assert.equal(attributes.get('data-font-country'), 'US');
  assert.equal(attributes.get('lang'), 'ja');
  applyVisitorLocale(root, ['en']);
  assert.equal(attributes.has('data-font-country'), false);
});
import { acceptLanguageCountry } from '../resources/visitor-locale.js';
test('Accept-Language uses quality and preserves the preferred locale even without a region', () => {
  assert.equal(acceptLanguageCountry('en-US;q=0.4, pt-BR;q=0.9'), 'BR');
  assert.equal(acceptLanguageCountry('en, en-US;q=0.9'), undefined);
  assert.equal(acceptLanguageCountry('invalid tag, zh-Hant-TW;q=0.5'), 'TW');
  assert.equal(acceptLanguageCountry('en-US;q=0, pt-PT'), 'PT');
});
