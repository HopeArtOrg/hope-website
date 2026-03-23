(function () {
  const STORAGE_KEY = "hope-theme";
  const theme = localStorage.getItem(STORAGE_KEY) || "system";
  const resolved
    = theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  if (resolved === "dark") {
    document.documentElement.classList.add("dark");
  }
  document.documentElement.style.colorScheme = resolved;
})();
