import type { APIContext } from "astro";

import { getCollection } from "astro:content";
import XMLBuilder from "fast-xml-builder";
import { resolveURL } from "ufo";

export async function GET(context: APIContext) {
  const builder = new XMLBuilder({
    format: true,
    ignoreAttributes: false,
  });

  const siteURL = context.site!.toString();
  const vnPosts = await getCollection("vnBlog");
  const enPosts = await getCollection("enBlog");

  const staticPages = [
    "",
    "/blog",
    "/privacy",
    "/terms",
    "/en",
    "/en/blog",
  ];

  const urls = [
    ...staticPages.map(page => ({
      loc: resolveURL(siteURL, page),
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: page === "" || page === "/en" ? "1.0" : "0.8",
    })),
    ...vnPosts.map(post => ({
      loc: resolveURL(siteURL, `/blog/${post.id}`),
      lastmod: post.data.publishDate.toISOString(),
      changefreq: "monthly",
      priority: "0.6",
    })),
    ...enPosts.map(post => ({
      loc: resolveURL(siteURL, `/en/blog/${post.id}`),
      lastmod: post.data.publishDate.toISOString(),
      changefreq: "monthly",
      priority: "0.6",
    })),
  ];

  const sitemap = builder.build({
    urlset: {
      "@_xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
      "url": urls,
    },
  });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n${sitemap}`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    },
  );
}
