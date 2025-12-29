// src/routes/search/+page.server.js
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

export async function load({ url }) {
  const params = url.searchParams;
  const country = params.get("country");

  console.log("Incoming search request:", url.search || "(no params)");

  if (!country) {
    console.log("No country parameter provided");
    return {
      results: [],
      total: 0,
      country: null,
    };
  }

  const query = {
    content_type: "property",
    "fields.country": country, // Direct field search — exact match on your country field
    limit: 100,
  };

  console.log(`Searching Contentful for country: "${country}"`);
  console.log("Query sent to CDA:", query);

  try {
    const response = await client.getEntries(query);

    console.log(
      `Contentful returned ${response.total} properties for ${country}`
    );

    const results = response.items.map((entry) => {
      const jsonData = _.get(entry, "fields.json");

      if (!jsonData) {
        console.warn(`Entry ${entry.sys.id} is missing json field`);
      }

      return jsonData;
    });

    console.log(`Delivered ${results.filter((r) => r).length} valid listings`);

    return {
      results,
      total: response.total,
      country,
    };
  } catch (error) {
    console.error("Contentful query failed:", error);
    return {
      results: [],
      total: 0,
      country,
    };
  }
}
