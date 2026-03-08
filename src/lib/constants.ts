import type { TranslationKey } from "@/i18n/ui";

export const SITE_NAME = "Hope Art";
export const THEME_STORAGE_KEY = "hope-theme";
export const GITHUB_REPO = "HopeArtOrg/hope-re";
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO}`;
export const LATEST_VERSION = "2.1.9";

export const STAR_SVG_PATH = "M1268.87,964.837c102.836,-184.48 154.253,-276.721 231.13,-276.721c76.877,0 128.294,92.24 231.127,276.72l26.605,47.727c29.228,52.423 43.834,78.636 66.623,95.931c22.781,17.295 51.149,23.714 107.899,36.554l51.668,11.69c199.691,45.184 299.545,67.775 323.3,144.166c23.756,76.388 -44.313,155.993 -180.457,315.187l-35.22,41.187c-38.686,45.238 -58.033,67.857 -66.737,95.843c-8.695,27.986 -5.772,58.163 0.073,118.527l5.326,54.948c20.581,212.405 30.876,318.608 -31.314,365.819c-62.198,47.211 -155.687,4.165 -342.664,-81.919l-48.372,-22.278c-53.13,-24.462 -79.695,-36.697 -107.859,-36.697c-28.164,0 -54.729,12.235 -107.859,36.697l-48.372,22.278c-186.978,86.084 -280.467,129.13 -342.66,81.919c-62.193,-47.211 -51.901,-153.414 -31.318,-365.819l5.324,-54.948c5.85,-60.364 8.774,-90.541 0.071,-118.527c-8.702,-27.986 -28.045,-50.605 -66.732,-95.843l-35.221,-41.187c-136.141,-159.194 -204.212,-238.799 -180.456,-315.187c23.756,-76.391 123.604,-98.982 323.302,-144.166l51.664,-11.69c56.747,-12.84 85.121,-19.26 107.903,-36.554c22.782,-17.295 37.395,-43.506 66.617,-95.931l26.605,-47.727Z";
export const STAR_SVG_STROKE_WIDTH = "121.78";

const releaseBase = `${GITHUB_REPO_URL}/releases/download/${LATEST_VERSION}`;

type Platform = {
  name: string;
  arch: string;
  icon: string;
  href: string;
};

export const platforms: Platform[] = [
  { name: "Windows", arch: "x64", icon: "cib:windows", href: `${releaseBase}/Hope-RE_${LATEST_VERSION}_x64-setup.exe` },
  { name: "macOS", arch: "aarch64", icon: "cib:apple", href: `${releaseBase}/Hope-RE_${LATEST_VERSION}_aarch64.dmg` },
  { name: "Linux", arch: "amd64", icon: "cib:linux", href: `${releaseBase}/Hope-RE_${LATEST_VERSION}_amd64.AppImage` },
  { name: "Linux", arch: "arm64", icon: "cib:linux", href: `${releaseBase}/Hope-RE_${LATEST_VERSION}_arm64.deb` },
];

export function detectPlatform(): Platform | null {
  if (typeof navigator === "undefined")
    return null;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win"))
    return platforms[0];
  if (ua.includes("mac"))
    return platforms[1];
  if (ua.includes("linux")) {
    if (ua.includes("aarch64") || ua.includes("arm"))
      return platforms[3];
    return platforms[2];
  }
  return null;
}

type NavLink = {
  key: TranslationKey;
  path: string;
  icon: string;
};

export const navLinks: NavLink[] = [
  { key: "nav.download", path: "/#download", icon: "lucide:download" },
  { key: "nav.blogs", path: "/blogs", icon: "lucide:pen-line" },
  { key: "nav.about", path: "/about", icon: "lucide:users" },
  { key: "nav.contact", path: "/contact", icon: "lucide:mail" },
];
