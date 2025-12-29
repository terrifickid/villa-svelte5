// src/routes/[country]/[city]/[title]/[id]/+page.server.js
// or wherever your dynamic route is
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
  const { id } = params; // This is the Guesty _id (e.g. ABC123)

  console.log(`Loading single property from Contentful: ID = ${id}`);

  if (!id) {
    console.warn("No property ID provided in URL");
    return {
      property: null,
      notFound: true,
    };
  }

  try {
    // Fetch SINGLE entry by its ID
    const entry = await client.getEntry(id);

    console.log(
      `✅ Found property: ${entry.fields.title?.["en-US"] || "Untitled"}`
    );

    // Extract the full Guesty object from your json field
    const property = _.get(entry, "fields.json");

    if (!property) {
      console.warn(`Entry ${id} exists but missing json field`);
      return {
        property: null,
        notFound: true,
      };
    }

    // Optional: also pass some useful top-level fields if you want
    return property;
  } catch (error) {
    // 404 if not found, or other error
    if (error.response?.status === 404) {
      console.log(`Property not found in Contentful: ${id}`);
    } else {
      console.error("Error fetching property from Contentful:", error);
    }

    return {
      property: null,
      notFound: true,
    };
  }
}
