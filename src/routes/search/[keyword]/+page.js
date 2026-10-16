// src/routes/search/[keyword]/+page.js
import { searchProperties } from "$lib/search";

export async function load({ params }) {
  const keyword = params.keyword?.trim();

  if (!keyword) {
    return { results: [], keyword: "", total: 0 };
  }

  try {
    const { results, total } = await searchProperties(keyword);
    return { results, keyword, total };
  } catch (error) {
    console.error("❌ Contentful CDA Error:", error);
    return { results: [], keyword, total: 0 };
  }
}
