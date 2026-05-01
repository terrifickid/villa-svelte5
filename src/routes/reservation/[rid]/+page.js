import axios from "axios";

export async function load({ params }) {
  const apiUrl = null + "/api";
  try {
    const response = await axios.post(apiUrl, {
      query: "reservations/" + params.rid + "/details",
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Couldnt find listing ID", error);
    return {
      results: [],
    };
  }
}
