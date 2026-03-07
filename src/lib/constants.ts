import type { TranslationKey } from "@/i18n/ui";

export const SITE_NAME = "Hope Art";
export const THEME_STORAGE_KEY = "hope-theme";

type NavLink = {
  key: TranslationKey;
  path: string;
};

export const navLinks: NavLink[] = [
  { key: "nav.download", path: "/download" },
  { key: "nav.blogs", path: "/blogs" },
  { key: "nav.about", path: "/about" },
  { key: "nav.contact", path: "/contact" },
];
