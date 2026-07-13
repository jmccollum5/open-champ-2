import { redis, KEYS } from "../../../lib/redis";
import { PARTICIPANTS } from "../../../lib/draftConfig";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password } = req.body || {};
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Incorrect admin password" });
  }

  try {
    const [picksRaw, currentPickRaw, historyRaw] = await Promise.all([
      redis.get(KEYS.picks),
      redis.get(KEYS.currentPick),
      redis.get(KEYS.history),
    ]);

    const history = historyRaw || [];
    if (history.length === 0) {
      return res.status(400).json({ error: "No picks to undo" });
    }

    const last = history[history.length - 1];
    const picks = picksRaw || Object.fromEntries(PARTICIPANTS.map((p) => [p, []]));
    picks[last.participant] = (picks[last.participant] || []).filter(
      (g) => g !== last.golfer
    );

    const newHistory = history.slice(0, -1);
    const currentPick = Math.max((currentPickRaw ?? 1) - 1, 0);

    await Promise.all([
      redis.set(KEYS.picks, picks),
      redis.set(KEYS.currentPick, currentPick),
      redis.set(KEYS.history, newHistory),
    ]);

    res.status(200).json({ ok: true, undone: last, picks, currentPick });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to undo pick" });
  }
}
