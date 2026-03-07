import en from "./en.json";
import vn from "./vn.json";

type Leaves<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends Record<string, string>
      ? `${K}.${keyof T[K] & string}`
      : never;
}[keyof T & string];

type TranslationMap = Record<Leaves<typeof vn>, string>;

function flatten(obj: Record<string, string | Record<string, string>>, prefix = ""): TranslationMap {
  const result: Record<string, string> = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      result[fullKey] = value;
    }
    else {
      Object.assign(result, flatten(value as Record<string, string>, fullKey));
    }
  }
  return result as TranslationMap;
}

export const languages = {
  vn: "Tiếng Việt",
  en: "English",
} as const;

export const defaultLang = "vn";
export const showDefaultLang = false;

export const ui = {
  en: flatten(en),
  vn: flatten(vn),
};

export type Locale = keyof typeof languages;
export type TranslationKey = Leaves<typeof vn>;
