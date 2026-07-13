import { redis, KEYS } from "../../lib/redis";
import { FIELD } from "../../lib/field";
import { DRAFT_ORDER, TOTAL_PICKS, PARTICIPANTS } from "../../lib/draftConfig";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { participant, golfer } = req.body || {};

  if (!participant || !golfer) {
    return res.status(400).json({ error: "participant and golfer are required" });
  }

  if (!FIELD.includes(golfer)) {
    return res.status(400).json({ error: "Golfer is not in the field" });
  }

  try {
    const [picksRaw, currentPickRaw] = await Promise.all([
      redis.get(KEYS.picks),
      redis.get(KEYS.currentPick),
    ]);

    const picks = picksRaw || Object.fromEntries(PARTICIPANTS.map((p) => [p, []]));
    const currentPick = currentPickRaw ?? 0;

    if (currentPick >= TOTAL_PICKS) {
      return res.status(400).json({ error: "Draft is already complete" });
    }

    const expectedParticipant = DRAFT_ORDER[currentPick];
    if (participant !== expectedParticipant) {
      return res
        .status(409)
        .json({ error: `It's ${expectedParticipant}'s pick, not ${participant}'s` });
    }

    const alreadyPicked = new Set(Object.values(picks).flat());
    if (alreadyPicked.has(golfer)) {
      return res.status(409).json({ error: `${golfer} has already been picked` });
    }

    picks[participant] = [...(picks[participant] || []), golfer];
    const nextPick = currentPick + 1;

    const historyRaw = (await redis.get(KEYS.history)) || [];
    const history = [...historyRaw, { participant, golfer }];

    await Promise.all([
      redis.set(KEYS.picks, picks),
      redis.set(KEYS.currentPick, nextPick),
      redis.set(KEYS.history, history),
    ]);

    res.status(200).json({
      picks,
      currentPick: nextPick,
      draftComplete: nextPick >= TOTAL_PICKS,
      onTheClock: nextPick >= TOTAL_PICKS ? null : DRAFT_ORDER[nextPick],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save pick" });
  }
}
