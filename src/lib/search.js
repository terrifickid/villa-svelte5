import _ from "lodash";
import { createClient } from "contentful";
import {
  PUBLIC_CONTENTFUL_SPACE_ID,
  PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
} from "$env/static/public";

export const ITEMS_PER_PAGE = 8;

const client = createClient({
  space: PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
});

// Full-text property search. Shared by the /search/[keyword] load (SSR) and by
// the page's infinite-scroll loader in the browser, so the Contentful query is
// defined in exactly one place.
export async function searchProperties(
  keyword,
  { skip = 0, limit = ITEMS_PER_PAGE } = {},
) {
  const response = await client.getEntries({
    content_type: "property",
    query: keyword, // full-text search
    skip,
    limit,
  });

  return {
    results: response.items.map((entry) => _.get(entry, "fields.json")),
    total: response.total,
  };
}
