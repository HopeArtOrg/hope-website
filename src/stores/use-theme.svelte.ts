import { THEME_STORAGE_KEY } from "@/lib/constants";

export type Theme = "light" | "dark" | "system";

function getStoredTheme(): Theme {
  if (typeof localStorage === "undefined")
    return "system";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system")
    return stored;
  return "system";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme !== "system")
    return theme;
  if (typeof window === "undefined")
    return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const resolved = resolveTheme(theme);
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.style.colorScheme = resolved;
}

let theme = $state<Theme>(getStoredTheme());

export function useThemeStore() {
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
