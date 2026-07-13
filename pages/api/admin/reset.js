import { redis, KEYS } from "../../../lib/redis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password } = req.body || {};
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Incorrect admin password" });
  }

  try {
    await Promise.all([
      redis.del(KEYS.picks),
      redis.del(KEYS.currentPick),
      redis.del(KEYS.history),
    ]);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reset draft" });
  }
}
