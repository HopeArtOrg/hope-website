import type { RSSFeedItem } from "@astrojs/rss";
import type { APIContext } from "astro";

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import XMLBuilder from "fast-xml-builder";
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
    "managingEditor": `trananhquan1009@gmail.com (Noah Trần)`,
    "webMaster": `trananhquan1009@gmail.com (Noah Trần)`,
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

  const items: RSSFeedItem[] = allPosts.map((post) => {
    return {
      title: `[${post.lang.toUpperCase()}] ${post.data.title}`,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: post.lang === "vn" ? `/blogs/${post.id}` : `/en/blogs/${post.id}`,
      author: "trananhquan1009@gmail.com (Noah Trần)",
    };
  });

  return rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      content: "http://purl.org/rss/1.0/modules/content/",
    },
    title: SITE_NAME,
    description: "Hope Art - Protecting Artists from AI style mimicry.",
    site: context.site!,
    items,
    customData: channelMeta,
  });
}
