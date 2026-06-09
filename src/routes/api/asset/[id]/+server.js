import { error, json } from "@sveltejs/kit";
import { createClient } from "contentful";
import {
  PUBLIC_CONTENTFUL_BLOG_SPACE_ID,
  PUBLIC_CONTENTFUL_BLOG_DELIVERY_TOKEN,
} from "$env/static/public";

function getBlogClient() {
  if (!PUBLIC_CONTENTFUL_BLOG_SPACE_ID || !PUBLIC_CONTENTFUL_BLOG_DELIVERY_TOKEN) {
    return null;
  }

  return createClient({
    space: PUBLIC_CONTENTFUL_BLOG_SPACE_ID,
    accessToken: PUBLIC_CONTENTFUL_BLOG_DELIVERY_TOKEN,
  });
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  const client = getBlogClient();
  if (!client) {
    throw error(503, "Blog assets are not configured");
  }

  try {
    const asset = await client.getAsset(params.id);
    return json(asset);
  } catch (err) {
    console.error("Contentful asset fetch failed:", err);
    throw error(404, "Asset not found");
  }
}