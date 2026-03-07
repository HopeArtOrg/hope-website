import type { Locale, TranslationKey } from "./ui";

import { defaultLang, showDefaultLang, ui } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui)
    return lang as Locale;
  return defaultLang;
}

export function useTranslations(lang: Locale) {
  return function t(key: TranslationKey) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalePath(lang: Locale, path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!showDefaultLang && lang === defaultLang)
    return normalizedPath;
  return `/${lang}${normalizedPath}`;
}
