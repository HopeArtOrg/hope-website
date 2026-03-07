import { THEME_STORAGE_KEY } from "@/lib/constants";

type Theme = "light" | "dark" | "system";

function getStoredTheme(): Theme {
  if (typeof localStorage === "undefined")
    return "system";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system")
    return stored;
  return "system";
}

function getSystemPreference(): "light" | "dark" {
  if (typeof window === "undefined")
    return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemPreference() : theme;
  const root = document.documentElement;

  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

export function useThemeStore() {
  let theme = $state<Theme>(getStoredTheme());

  $effect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  });

  $effect(() => {
    if (theme !== "system")
      return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  });

  return {
    get current() {
      return theme;
    },
    set current(value: Theme) {
      theme = value;
    },
  };
}
