import { useEffect, useState, useCallback, useMemo } from "react";
import { PARTICIPANTS, PICKS_PER_PERSON, SCORING_PICKS } from "../lib/draftConfig";

const POLL_MS = 4000;

export default function Home() {
  const [state, setState] = useState(null);
  const [actor, setActor] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch("/api/state");
      const data = await res.json();
      if (!res.ok) {
        setState({ loadError: data.error || "Failed to load draft state" });
        return;
      }
      setState(data);
    } catch (e) {
      console.error(e);
      setState({ loadError: "Network error loading draft state" });
    }
  }, []);

  useEffect(() => {
    fetchState();
    const id = setInterval(fetchState, POLL_MS);
    return () => clearInterval(id);
  }, [fetchState]);

  useEffect(() => {
    const saved = typeof window !== "undefined" && window.localStorage.getItem("openchamp-actor");
    if (saved) setActor(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && actor) {
      window.localStorage.setItem("openchamp-actor", actor);
    }
  }, [actor]);

  const filteredAvailable = useMemo(() => {
    if (!state) return [];
    const term = search.trim().toLowerCase();
    if (!term) return state.available;
    return state.available.filter((g) => g.toLowerCase().includes(term));
  }, [state, search]);

  async function makePick(golfer) {
    setError("");
    setSuccess("");
    if (!actor) {
      setError("Choose your name first.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/pick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participant: actor, golfer }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Pick failed");
      } else {
        setSuccess(`${actor} picked ${golfer}!`);
        setSearch("");
        setState((prev) => ({ ...prev, ...data }));
        fetchState();
      }
    } catch (e) {
      setError("Network error making pick");
    } finally {
      setSubmitting(false);
    }
  }

  async function adminAction(path) {
    setError("");
    setSuccess("");
    if (!adminPassword) {
      setError("Enter the admin password.");
      return;
    }
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Admin action failed");
      } else {
        setSuccess("Done.");
        fetchState();
      }
    } catch (e) {
      setError("Network error");
    }
  }

  if (!state) {
    return (
      <div className="container">
        <p>Loading draft board…</p>
      </div>
    );
  }

  if (state.loadError) {
    return (
      <div className="container">
        <div className="panel">
          <h2>Couldn't load the draft board</h2>
          <p className="error-msg">{state.loadError}</p>
          <p>
            This usually means the Redis environment variables aren't set correctly in
            Vercel yet. Check Settings → Environment Variables for
            <code> UPSTASH_REDIS_REST_URL</code>/<code>UPSTASH_REDIS_REST_TOKEN</code> or
            <code> KV_REST_API_URL</code>/<code>KV_REST_API_TOKEN</code>, then redeploy.
          </p>
        </div>
      </div>
    );
  }

  const { picks, onTheClock, currentPick, totalPicks, draftComplete } = state;

  return (
    <div>
      <div className="header">
        <h1>🏆 Open Championship 2026 — Draft</h1>
        <p>Royal Birkdale · July 16–19 · Snake draft, 7 picks each, top {SCORING_PICKS} count</p>
      </div>

      <div className="container">
        {draftComplete ? (
          <div className="complete-banner">Draft complete — good luck at Royal Birkdale!</div>
        ) : (
          <div className="clock-banner">
            <div className="onclock">
              On the clock: <span>{onTheClock}</span>
            </div>
            <div className="progress">
              Pick {currentPick + 1} of {totalPicks}
            </div>
          </div>
        )}

        <div className="panel">
          <h2>Who are you?</h2>
          <div className="actor-row">
            <select value={actor} onChange={(e) => setActor(e.target.value)}>
              <option value="">Select your name…</option>
              {PARTICIPANTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {actor && !draftComplete && (
              <span style={{ color: actor === onTheClock ? "#1f5c3f" : "#888" }}>
                {actor === onTheClock ? "It's your pick!" : `Waiting for ${onTheClock}`}
              </span>
            )}
          </div>

          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}
        </div>

        {!draftComplete && (
          <div className="panel">
            <h2>Available golfers ({state.available.length})</h2>
            <input
              type="text"
              placeholder="Search golfers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", marginBottom: 12 }}
            />
            <div className="available-list">
              {filteredAvailable.map((g) => (
                <button
                  key={g}
                  className="golfer-btn"
                  disabled={submitting || !actor || actor !== onTheClock}
                  onClick={() => makePick(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="panel">
          <h2>Draft board</h2>
          <div className="board">
            {PARTICIPANTS.map((p) => (
              <div key={p} className={`board-col ${p === onTheClock ? "on-clock" : ""}`}>
                <h3>
                  {p}{" "}
                  <span className="badge">
                    {(picks[p] || []).length}/{PICKS_PER_PERSON}
                  </span>
                </h3>
                <ol>
                  {Array.from({ length: PICKS_PER_PERSON }).map((_, i) => {
                    const g = (picks[p] || [])[i];
                    return (
                      <li key={i} className={g ? "" : "empty"}>
                        {g || "—"}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <button className="admin-toggle" onClick={() => setShowAdmin((s) => !s)}>
            {showAdmin ? "Hide admin tools" : "Admin tools"}
          </button>
          {showAdmin && (
            <div style={{ marginTop: 12 }}>
              <input
                type="password"
                placeholder="Admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                style={{ marginRight: 10 }}
              />
              <button className="danger" onClick={() => adminAction("/api/admin/undo")} style={{ marginRight: 8 }}>
                Undo last pick
              </button>
              <button
                className="danger"
                onClick={() => {
                  if (window.confirm("Reset the entire draft? This cannot be undone.")) {
                    adminAction("/api/admin/reset");
                  }
                }}
              >
                Reset draft
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
