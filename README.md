# Open Championship 2026 — Picks App

Draft/picks app for the friend-group golf pool at the 154th Open Championship (Royal Birkdale, July 16–19, 2026).

Same ruleset as prior majors: each of the 9 participants drafts 7 golfers via a snake draft; the top 4 scores count toward the team total; lowest team total wins.

## Draft order (randomly drawn)

Mike → Tomas → Mark → Adrian → Jack → Zach → Georgie → Corey → Kollas

Snake draft, so it reverses each round (round 2 is Kollas → Corey → ... → Mike), giving whoever picks last in a round a double pick at the turn.

## Deploy steps

1. **Push to GitHub**
   - Go to `github.com/new/import`
   - Import this folder as a new repo, e.g. `open-champ-picks`
   - (If pushing from your machine instead: `git init && git add . && git commit -m "Open Championship picks app" && git remote add origin <your-repo-url> && git push -u origin main`)

2. **Create an Upstash Redis database**
   - Go to [upstash.com](https://upstash.com) → create a new Redis database (or reuse one if you still have an active one from a prior major — check first, since inactive DBs get deleted)
   - Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

3. **Import into Vercel**
   - Go to `vercel.com/new`, import the `open-champ-picks` repo
   - Framework preset should auto-detect Next.js — leave defaults
   - Before deploying, add these Environment Variables:
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`
     - `ADMIN_PASSWORD` (defaults to `openchamp2026` if you want to keep it, or set your own)
   - Deploy

4. **Share the link** with the group. Each person picks their name from the dropdown — it only lets you submit a pick when it's your turn.

5. **Admin tools** (bottom of the page, password-gated): undo the last pick if someone clicks the wrong golfer, or reset the whole draft if you need to start over.

## Notes

- The field list (`lib/field.js`) has 156 golfers as of July 7, plus whoever wins Monday's (July 13) Last Chance Qualifier — check `theopen.com/field` and add that name manually to `lib/field.js` if it's missing before the draft starts.
- If local terminal changes aren't syncing to the deployed app, edit directly in GitHub's web editor (pencil icon on the file → select all → paste → commit) — that's been the reliable fallback before.
- Once the draft is done, the next step is building the companion scoring/leaderboard app (same pattern as `pga-scoring-2026` / `us-open-scoring-2026`), importing from the scoring repo template — not this picks repo.
