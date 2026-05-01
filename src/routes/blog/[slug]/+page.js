import axios from "axios";
import { PUBLIC_API_SERVER } from "$env/static/public";
export async function load({ url }) {
var r = url.pathname.split("/");
  var destination = r[r.length - 1];
  const apiUrl = PUBLIC_API_SERVER + "/blog/" + destination;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    return None
  }
}
