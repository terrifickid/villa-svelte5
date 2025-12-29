// No need for axios or environment variables anymore
// import axios from "axios";
// import { PUBLIC_API_SERVER } from "$env/static/public";

export async function load({ page }) {
  // Hardcoded list of countries (exactly matching your previous output)
  const countries = [
    "Anguilla",
    "Antigua and Barbuda",
    "Barbados",
    "Dominican Republic",
    "Mexico",
    "Saint Lucia",
    "Saint Martin",
    "Saint Vincent and the Grenadines",
    "Sint Maarten",
    "Turks and Caicos Islands",
    "United States",
  ];

  // Sort them alphabetically (optional, but matches your previous behavior)
  const sorted = countries.sort();

  // Return in the same shape your component expects
  return { countries: sorted };
}
