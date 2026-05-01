import axios from "axios";

export async function load({ url }) {
  var r = url.pathname.split("/");
  var destination = r[r.length - 1];
  const apiUrl = null + "/blog/" + destination;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    return None;
  }
}
