import { dev } from '$app/environment';

// no client-side JS needed; load in dev for HMR
export const csr = dev;

// static output
export const prerender = true;
