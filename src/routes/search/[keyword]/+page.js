// src/routes/search/[keyword]/+page.server.js
import _ from "lodash";
import { createClient } from "contentful";
import {
  PUBLIC_CONTENTFUL_SPACE_ID,
  PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
} from "$env/static/public";

const client = createClient({
  space: PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
});

const ITEMS_PER_PAGE = 8;

export async function load({ params, url }) {
  const keyword = params.keyword?.trim();

  // Get current page from URL query param, default to 1
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));

  if (!keyword) {
    console.log("No keyword provided");
    return {
      results: [],
      keyword: "",
      total: 0,
      currentPage: 1,
      totalPages: 0,
    };
  }

  const queryParams = {
    content_type: "property",
    query: keyword, // full-text search
    limit: ITEMS_PER_PAGE,
    skip: (page - 1) * ITEMS_PER_PAGE, // ← This enables pagination
    // 'fields.tags[in]': 'iCal',    // uncomment if you had this filter before
  };

  // LOG THE EXACT QUERY BEING SENT
  console.log(
    "🔍 Contentful CDA Query Params:",
    JSON.stringify(queryParams, null, 2)
  );
  console.log(`Full-text search keyword: "${keyword}"`);
  console.log(
    `Page: ${page} (skip: ${queryParams.skip}, limit: ${queryParams.limit})`
  );
  console.log(`Space ID: ${PUBLIC_CONTENTFUL_SPACE_ID}`);
  console.log(`Content type: property`);

  try {
    const response = await client.getEntries(queryParams);

    // LOG THE RESPONSE SUMMARY
    console.log(`✅ Total entries found: ${response.total}`);
    console.log(`Items returned: ${response.items.length}`);
    console.log("Skip/Limit:", response.skip, response.limit);

    if (response.items.length === 0) {
      console.log("⚠️  No matching entries. Possible reasons:");
      console.log("   - Full-text search didn't match any indexed fields");
      console.log(
        "   - Entries not published (CDA only returns published content)"
      );
      console.log('   - Locale mismatch (check "en-US")');
      console.log('   - Content type ID is wrong (must be exactly "property")');
    }

    const results = response.items.map((entry) => _.get(entry, "fields.json"));

    console.log(`Processed results count: ${results.length}`);

    const totalPages = Math.ceil(response.total / ITEMS_PER_PAGE);

    return {
      results,
      keyword,
      total: response.total,
      currentPage: page,
      totalPages,
    };
  } catch (error) {
    console.error("❌ Contentful CDA Error:", error);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    return {
      results: [],
      keyword,
      total: 0,
      currentPage: 1,
      totalPages: 0,
    };
  }
}
