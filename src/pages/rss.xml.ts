import type { RSSFeedItem } from "@astrojs/rss";
import type { APIContext } from "astro";

import rss from "@astrojs/rss";
import { getCollection, render } from "astro:content";
import XMLBuilder from "fast-xml-builder";
import sanitizeHtml from "sanitize-html";
import { resolveURL } from "ufo";

import { SITE_NAME } from "@/lib/constants";

export async function GET(context: APIContext) {
  const builder = new XMLBuilder();
  const vnPosts = await getCollection("vnBlog");
  const enPosts = await getCollection("enBlog");

  const siteURL = context.site!.toString();

  const allPosts = [
    ...vnPosts.map(post => ({ ...post, lang: "vn" })),
    ...enPosts.map(post => ({ ...post, lang: "en" })),
  ].sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  const channelMeta = builder.build({
    "language": "vn",
    "copyright": `CC BY-NC 4.0 © ${SITE_NAME}`,
    "managingEditor": `contact@hope-art.app (${SITE_NAME})`,
    "webMaster": `contact@hope-art.app (${SITE_NAME})`,
    "image": {
      url: resolveURL(siteURL, "logo.svg"),
      link: siteURL,
      title: SITE_NAME,
    },
    "atom:link": {
      "@_href": resolveURL(siteURL, "rss.xml"),
      "@_rel": "self",
      "@_type": "application/rss+xml",
    },
  });

  const items: RSSFeedItem[] = await Promise.all(
    allPosts.map(async (post) => {
      const { html } = await render(post);
      return {
        title: `[${post.lang.toUpperCase()}] ${post.data.title}`,
        pubDate: post.data.publishDate,
        description: post.data.description,
        link: post.lang === "vn" ? `/blogs/${post.id}` : `/en/blogs/${post.id}`,
        author: `contact@hope-art.app (${SITE_NAME})`,
        content: sanitizeHtml(html, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        }),
      };
    }),
  );

  return rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    title: SITE_NAME,
    description: "Hope Art - Protecting Artists from AI style mimicry.",
    site: context.site!,
    items,
    customData: channelMeta,
  });
}
