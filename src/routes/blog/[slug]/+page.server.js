import { error } from "@sveltejs/kit";
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
export async function load({ params }) {
  const client = getBlogClient();
  if (!client) {
    throw error(503, "Blog is not configured");
  }

  try {
    const response = await client.getEntries({
      content_type: BLOG_CONTENT_TYPE,
      "fields.slug": params.slug,
      limit: 1,
    });

    const entry = response.items[0];
    if (!entry) {
      throw error(404, "Blog post not found");
    }

    return { entry };
  } catch (err) {
    if (err && typeof err === "object" && "status" in err) {
      throw err;
    }

    console.error("Contentful blog post fetch failed:", err);
    throw error(404, "Blog post not found");
  }
}