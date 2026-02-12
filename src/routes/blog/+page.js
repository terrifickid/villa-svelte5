import axios from "axios";
import { PUBLIC_API_SERVER } from "$env/static/public";
export async function load({ url }) {
  const apiUrl = PUBLIC_API_SERVER + "/blog/";
  try {
    const response = await axios.get(apiUrl);
    return {
      results: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      results: [],
    };
  }
}
