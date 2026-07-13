import { Redis } from "@upstash/redis";

// Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars
// (set these in Vercel project settings, same as prior tournament apps).
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const KEYS = {
  picks: "openchamp:picks", // { [participant]: string[] }
  currentPick: "openchamp:currentPick", // number, index into DRAFT_ORDER
  history: "openchamp:history", // array of { participant, golfer } in pick order, for undo
};
