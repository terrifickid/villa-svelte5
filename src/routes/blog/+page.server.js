import { createClient } from "contentful";
import {
  PUBLIC_CONTENTFUL_BLOG_SPACE_ID,
  PUBLIC_CONTENTFUL_BLOG_DELIVERY_TOKEN,
} from "$env/static/public";

const BLOG_CONTENT_TYPE = "blogPost";

function getBlogClient() {
  if (!PUBLIC_CONTENTFUL_BLOG_SPACE_ID || !PUBLIC_CONTENTFUL_BLOG_DELIVERY_TOKEN) {
    return null;
  }

  return createClient({
    space: PUBLIC_CONTENTFUL_BLOG_SPACE_ID,
    accessToken: PUBLIC_CONTENTFUL_BLOG_DELIVERY_TOKEN,
  });
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const client = getBlogClient();
  if (!client) {
    console.warn("Blog Contentful credentials are not configured");
    return { results: [] };
  }

  try {
    const response = await client.getEntries({
      content_type: BLOG_CONTENT_TYPE,
      order: "-sys.publishedAt",
    });

    return { results: response.items };
  } catch (err) {
    console.error("Contentful blog fetch failed:", err);
    return { results: [] };
  }
}