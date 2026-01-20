export const config = {
  isr: {
    expiration: false, // ← This is the key line: never expire the cache
  },
};
