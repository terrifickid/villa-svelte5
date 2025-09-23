import adapter from "@sveltejs/adapter-vercel";
import dotenvJSON from "dotenv-json";
// Load .env.json only if not in Vercel environment
if (!process.env.VERCEL) {
  dotenvJSON(); // Loads ./env.json by default
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    alias: {
      $components: "src/components",
    },
    adapter: adapter(),
  },
  //compilerOptions: {
  //  runes: true, // Enable runes mode globally
  //},
};

export default config;
