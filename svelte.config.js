import adapter from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: { adapter: adapter() },
  compilerOptions: {
    runes: true, // Enable runes mode globally
  },
};

export default config;
