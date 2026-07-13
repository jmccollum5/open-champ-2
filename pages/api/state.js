import { redis, KEYS } from "../../lib/redis";
import { FIELD } from "../../lib/field";
import { DRAFT_ORDER, TOTAL_PICKS, PARTICIPANTS } from "../../lib/draftConfig";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const [picksRaw, currentPickRaw] = await Promise.all([
      redis.get(KEYS.picks),
      redis.get(KEYS.currentPick),
    ]);

    const picks = picksRaw || Object.fromEntries(PARTICIPANTS.map((p) => [p, []]));
    const currentPick = currentPickRaw ?? 0;

    const pickedGolfers = new Set(Object.values(picks).flat());
    const available = FIELD.filter((g) => !pickedGolfers.has(g));

    const draftComplete = currentPick >= TOTAL_PICKS;
    const onTheClock = draftComplete ? null : DRAFT_ORDER[currentPick];

    res.status(200).json({
      picks,
      available,
      currentPick,
      totalPicks: TOTAL_PICKS,
      draftOrder: DRAFT_ORDER,
      onTheClock,
      draftComplete,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load draft state" });
  }
}
