// Draft order for the Open Championship 2026 pool, randomly drawn.
export const PARTICIPANTS = [
  "Mike",
  "Tomas",
  "Mark",
  "Adrian",
  "Jack",
  "Zach",
  "Georgie",
  "Corey",
  "Kollas",
];

export const PICKS_PER_PERSON = 7;
export const SCORING_PICKS = 4; // top 4 of 7 count toward team total

// Build the full snake-draft pick order (63 picks total).
// Round 1: draw order. Round 2: reversed. Round 3: draw order. etc.
// Whoever picks last in a round also picks first in the next round,
// giving them a "double pick" at each turn.
export function buildSnakeOrder() {
  const order = [];
  for (let round = 0; round < PICKS_PER_PERSON; round++) {
    const roundOrder =
      round % 2 === 0 ? PARTICIPANTS : [...PARTICIPANTS].reverse();
    order.push(...roundOrder);
  }
  return order; // length = PARTICIPANTS.length * PICKS_PER_PERSON
}

export const DRAFT_ORDER = buildSnakeOrder();
export const TOTAL_PICKS = DRAFT_ORDER.length;
