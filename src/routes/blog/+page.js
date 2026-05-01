import axios from "axios";

export async function load({ url }) {
  const apiUrl = null + "/blog/";
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
