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

export async function load({ params }) {
  const keyword = params.keyword?.trim();

  if (!keyword) {
    console.log("No keyword provided");
    return { results: [], keyword: "" };
  }

  const queryParams = {
    content_type: "property",
    query: keyword, // full-text search
    limit: 20,
    // 'fields.tags[in]': 'iCal',    // uncomment if you had this filter before
  };

  // LOG THE EXACT QUERY BEING SENT
  console.log(
    "🔍 Contentful CDA Query Params:",
    JSON.stringify(queryParams, null, 2)
  );
  console.log(`Full-text search keyword: "${keyword}"`);
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

    return {
      results,
      keyword,
      total: response.total,
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
    };
  }
}
