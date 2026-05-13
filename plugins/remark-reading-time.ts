import type { Root } from "mdast";
import type { VFile } from "vfile";

import { toString } from "mdast-util-to-string";
import readingTime from "reading-time";

export function remarkReadingTime() {
  return (tree: Root, { data }: VFile) => {
    const raw = toString(tree);
    const readingMins = Math.round(readingTime(raw).minutes);

    const astroData = data as {
      astro?: {
        frontmatter?: Record<string, any>;
      };
    };

    if (astroData.astro?.frontmatter) {
      astroData.astro.frontmatter.readingTimeInMin = readingMins;
    }
  };
}
