import type { TranslationKey } from "@/i18n/ui";

import sample1 from "@/components/landing/demo/assets/sample-1.jpg";
import sample2 from "@/components/landing/demo/assets/sample-2.png";
import sample3 from "@/components/landing/demo/assets/sample-3.png";
import sample4 from "@/components/landing/demo/assets/sample-4.png";
import sample5 from "@/components/landing/demo/assets/sample-5.png";
import sample6 from "@/components/landing/demo/assets/sample-6.jpg";

export const SITE_NAME = "Hope Art";
export const THEME_STORAGE_KEY = "hope-theme";
export const GITHUB_REPO = "HopeArtOrg/hope-re";
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO}`;
export const LATEST_VERSION = "2.1.16";

export const STAR_SVG_PATH = "M1268.87,964.837c102.836,-184.48 154.253,-276.721 231.13,-276.721c76.877,0 128.294,92.24 231.127,276.72l26.605,47.727c29.228,52.423 43.834,78.636 66.623,95.931c22.781,17.295 51.149,23.714 107.899,36.554l51.668,11.69c199.691,45.184 299.545,67.775 323.3,144.166c23.756,76.388 -44.313,155.993 -180.457,315.187l-35.22,41.187c-38.686,45.238 -58.033,67.857 -66.737,95.843c-8.695,27.986 -5.772,58.163 0.073,118.527l5.326,54.948c20.581,212.405 30.876,318.608 -31.314,365.819c-62.198,47.211 -155.687,4.165 -342.664,-81.919l-48.372,-22.278c-53.13,-24.462 -79.695,-36.697 -107.859,-36.697c-28.164,0 -54.729,12.235 -107.859,36.697l-48.372,22.278c-186.978,86.084 -280.467,129.13 -342.66,81.919c-62.193,-47.211 -51.901,-153.414 -31.318,-365.819l5.324,-54.948c5.85,-60.364 8.774,-90.541 0.071,-118.527c-8.702,-27.986 -28.045,-50.605 -66.732,-95.843l-35.221,-41.187c-136.141,-159.194 -204.212,-238.799 -180.456,-315.187c23.756,-76.391 123.604,-98.982 323.302,-144.166l51.664,-11.69c56.747,-12.84 85.121,-19.26 107.903,-36.554c22.782,-17.295 37.395,-43.506 66.617,-95.931l26.605,-47.727Z";
export const STAR_SVG_STROKE_WIDTH = "121.78";

const releaseBase = `${GITHUB_REPO_URL}/releases/download/${LATEST_VERSION}`;

type Platform = {
  index: number;
  name: string;
  arch: string;
  icon: string;
  href: string;
};

export const platforms: Platform[] = [
  { index: 1, name: "Windows", arch: "x64", icon: "cib:windows", href: `${releaseBase}/Hope-RE_${LATEST_VERSION}_x64-setup.exe` },
  { index: 2, name: "macOS", arch: "aarch64", icon: "cib:apple", href: `${releaseBase}/Hope-RE_${LATEST_VERSION}_aarch64.dmg` },
  { index: 3, name: "Linux", arch: "amd64", icon: "cib:linux", href: `${releaseBase}/Hope-RE_${LATEST_VERSION}_amd64.AppImage` },
  { index: 4, name: "Linux", arch: "aarch64", icon: "cib:linux", href: `${releaseBase}/Hope-RE_${LATEST_VERSION}_aarch64.AppImage` },
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

type TechItem = {
  name: string;
  color: string;
};

export const MESSAGE_LIST: TechItem[] = [
  { name: "Art", color: "#f96743" },
  { name: "Draw", color: "#ffc131" },
  { name: "Human", color: "#38bdf8" },
  { name: "Hope", color: "#a78bfa" },
];

export const navLinks: NavLink[] = [
  { key: "nav.download", path: "/#download", icon: "lucide:download" },
  { key: "nav.about", path: "/#about", icon: "lucide:info" },
  { key: "nav.demo", path: "/#demo", icon: "lucide:play" },
  { key: "nav.blogs", path: "/blogs", icon: "lucide:pen-line" },
];

export const DEMO_IMAGES = [
  { src: sample1, alt: "demo.imageAlt1" },
  { src: sample2, alt: "demo.imageAlt2" },
  { src: sample3, alt: "demo.imageAlt3" },
  { src: sample4, alt: "demo.imageAlt4" },
  { src: sample5, alt: "demo.imageAlt5" },
  { src: sample6, alt: "demo.imageAlt6" },
] as const;

export const PROTECTION_METHODS = [
  { name: "Nightshade", color: "#ef4444" },
  { name: "Noise", color: "#22c55e" },
  { name: "Glaze", color: "#3b82f6" },
] as const;

export const DEMO_TILT_MAX_DEG = 6;
export const DEMO_TILT_SCALE = 1.03;
export const DEMO_TILT_PERSPECTIVE = 800;

export const DEMO_IMAGE_STACK_OFFSET_X = 8;
export const DEMO_IMAGE_STACK_OFFSET_Y = 6;

export const DEMO_STAR_EXPLOSION_COUNT = 12;
export const DEMO_STAR_EXPLOSION_RADIUS = 100;
export const DEMO_STAR_EXPLOSION_DURATION = 0.6;

export const DEMO_FRAME_JUMP_DURATION = 0.5;
export const DEMO_FRAME_DASH_ARRAY = "6 4";
export const DEMO_FRAME_STROKE_WIDTH = 2;
export const DEMO_FRAME_BORDER_RADIUS = 8;
export const DEMO_FRAME_PADDING = 6;

export const DEMO_SCROLL_REVEAL_DURATION = 1;
export const DEMO_SCROLL_REVEAL_DELAY = 0.2;
export const DEMO_SCROLL_REVEAL_Y = 80;
export const DEMO_SCROLL_REVEAL_Y_MOBILE = 40;
export const DEMO_SCROLL_TRIGGER_START = "top 85%";
export const DEMO_SMALL_BREAKPOINT = 640;

export const DEMO_CYCLE_TRANSITION_DURATION = 0.4;

export const AUTHOR_TILT_MAX_DEG = 8;
export const AUTHOR_TILT_PERSPECTIVE = 800;

export const AUTHOR_SHUFFLE_DURATION = 0.5;
export const AUTHOR_SHUFFLE_OFFSET_X = 20;
export const AUTHOR_SHUFFLE_OFFSET_Y = 15;

export const AUTHOR_SCROLL_REVEAL_DURATION = 1;
export const AUTHOR_SCROLL_REVEAL_DELAY = 0.2;
export const AUTHOR_SCROLL_REVEAL_Y = 80;
export const AUTHOR_SCROLL_REVEAL_Y_MOBILE = 40;
export const AUTHOR_SCROLL_TRIGGER_START = "top 85%";
export const AUTHOR_SMALL_BREAKPOINT = 640;

export const AUTHOR_STAR_EXPLOSION_COUNT = 6;
export const AUTHOR_STAR_EXPLOSION_RADIUS = 80;
export const AUTHOR_STAR_EXPLOSION_DURATION = 0.6;

export type AuthorSocialLink = {
  labelKey: TranslationKey;
  href: string;
  icon: string;
  color: string;
};

export const HARUYU_LINKS: AuthorSocialLink[] = [
  { labelKey: "author.github", href: "https://github.com/quachdang122-jpg", icon: "lucide:github", color: "#a78bfa" },
  { labelKey: "author.vgen", href: "https://vgen.co/iceyDh", icon: "lucide:palette", color: "#f97316" },
  { labelKey: "author.facebook", href: "https://www.facebook.com/aksd021s", icon: "lucide:facebook", color: "#3b82f6" },
  { labelKey: "author.portfolio", href: "https://haruyasato.carrd.co", icon: "lucide:globe", color: "#22c55e" },
];

export const NOAH_LINKS: AuthorSocialLink[] = [
  { labelKey: "author.github", href: "https://github.com/Coder-Blue", icon: "lucide:github", color: "#a78bfa" },
  { labelKey: "author.facebook", href: "https://www.facebook.com/noah.tran1109", icon: "lucide:facebook", color: "#3b82f6" },
  { labelKey: "author.portfolio", href: "https://noah-pblog.vercel.app/en", icon: "lucide:globe", color: "#22c55e" },
];
