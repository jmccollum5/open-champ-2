import { Redis } from "@upstash/redis";

// Vercel's "Install Integration" flow for Upstash (Marketplace/Storage tab)
// names the env vars differently depending on how the database was created
// (KV_REST_API_URL / KV_REST_API_TOKEN is common), vs. creating a database
// directly on upstash.com which uses UPSTASH_REDIS_REST_URL / _TOKEN. Support
// both so it works regardless of which path was used to provision it.
const url =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

if (!url || !token) {
  console.error(
    "Missing Redis env vars. Checked UPSTASH_REDIS_REST_URL/KV_REST_API_URL and " +
      "UPSTASH_REDIS_REST_TOKEN/KV_REST_API_TOKEN — none were set."
  );
}

export const redis = new Redis({ url, token });

export const KEYS = {
  picks: "openchamp:picks", // { [participant]: string[] }
  currentPick: "openchamp:currentPick", // number, index into DRAFT_ORDER
  history: "openchamp:history", // array of { participant, golfer } in pick order, for undo
};
