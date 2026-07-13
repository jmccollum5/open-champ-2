import { redis, KEYS } from "../../lib/redis";
import { FIELD } from "../../lib/field";
import { getOdds } from "../../lib/odds";
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

    // Odds map for every golfer in the field, keyed by name, for the
    // frontend to show next to picks already made on the draft board.
    const oddsByGolfer = Object.fromEntries(
      FIELD.map((name) => [name, getOdds(name)])
    );

    // Favorites (lowest winner odds) first; golfers with no posted line
    // (mostly amateurs/late qualifiers) sort alphabetically at the end.
    const available = FIELD.filter((g) => !pickedGolfers.has(g)).sort((a, b) => {
      const oa = oddsByGolfer[a]?.winnerNum;
      const ob = oddsByGolfer[b]?.winnerNum;
      if (oa == null && ob == null) return a.localeCompare(b);
      if (oa == null) return 1;
      if (ob == null) return -1;
      return oa - ob;
    });

    const draftComplete = currentPick >= TOTAL_PICKS;
    const onTheClock = draftComplete ? null : DRAFT_ORDER[currentPick];

    res.status(200).json({
      picks,
      available,
      oddsByGolfer,
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
