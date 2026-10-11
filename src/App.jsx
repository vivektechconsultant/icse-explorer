import { useEffect, useMemo, useState } from "react";
import { SUBJECTS, SUBJECT_ORDER } from "./subjects.js";
import { LEGACY_IDS } from "./maths.js";
import { TESTS } from "./tests.js";

const STORE = "icse-explorer-v3";
const V2_STORE = "icse-explorer-v2";
const OLD_STORE = "icse-physics-explorer-v1";
const TABS = [
  ["notes", "Notes"],
  ["formulas", "Formulas"],
  ["examples", "Solved examples"],
  ["quiz", "Quiz"],
  ["test", "Unit test"],
];

const TEST_MINUTES = 15;

// Same shuffle every time for a given question, so answers are not all in one position.
function seededOrder(seed, n) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const order = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function youtubeUrl(subjectName, title) {
  const q = `ICSE Class 10 ${subjectName} ${title}`;
  return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
}

// v2 saved maths progress by chapter number; v3 uses stable chapter ids.
function migrateV2(v2) {
  const mathsNum = (n) => {
    const id = LEGACY_IDS[n];
    const c = SUBJECTS.maths.chapters.find((x) => x.id === id);
    return c ? c.n : 1;
  };
  const revised = {};
  Object.keys(v2.revised || {}).forEach((k) => {
    const m = k.match(/^maths:(\d+)-(\d+)$/);
    revised[m ? `maths:${LEGACY_IDS[m[1]]}-${m[2]}` : k] = true;
  });
  const best = {};
  Object.entries(v2.best || {}).forEach(([k, v]) => {
    const m = k.match(/^maths:(\d+)$/);
    best[m ? `maths:${LEGACY_IDS[m[1]]}` : k] = v;
  });
  const chapters = { ...(v2.chapters || {}), maths: mathsNum(v2.chapters?.maths ?? 1) };
  return { ...v2, revised, best, chapters };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE);
    if (raw) return JSON.parse(raw);
    const v2 = localStorage.getItem(V2_STORE);
    if (v2) return migrateV2(JSON.parse(v2));
    // Carry over progress saved by the physics-only version.
    const old = JSON.parse(localStorage.getItem(OLD_STORE) || "null");
    if (old) {
      const revised = {};
      Object.keys(old.revised || {}).forEach((k) => (revised[`physics:${k}`] = true));
      const best = {};
      Object.entries(old.best || {}).forEach(([k, v]) => (best[`physics:${k}`] = v));
      return { subject: "physics", chapters: { physics: old.chapter || 1, maths: 1 }, tab: old.tab, revised, best };
    }
  } catch (e) {}
  return null;
}

function Highlight({ text, q }) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

// Progress keys: physics chapters use their number, maths chapters a stable id.
const ck = (ch) => ch.id ?? ch.n;
const rKey = (subj, ch, i) => `${subj}:${ck(ch)}-${i}`;
const bKey = (subj, ch) => `${subj}:${ck(ch)}`;
const tKey = (subj, ch) => `test:${subj}:${ck(ch)}`;

function chapterProgress(subj, ch, revised, best) {
  const done = ch.notes.filter((_, i) => revised[rKey(subj, ch, i)]).length;
  return { done, total: ch.notes.length, best: best[bKey(subj, ch)], test: best[tKey(subj, ch)] };
}

export default function App() {
  const saved = loadState();
  const [subject, setSubject] = useState(saved?.subject ?? "physics");
  const [chapters, setChapters] = useState(saved?.chapters ?? { physics: 1, maths: 1 });
  const [tab, setTab] = useState(saved?.tab ?? "notes");
  const [view, setView] = useState("chapter"); // chapter | sheet
  const [query, setQuery] = useState("");
  const [revised, setRevised] = useState(saved?.revised ?? {});
  const [best, setBest] = useState(saved?.best ?? {});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify({ subject, chapters, tab, revised, best }));
    } catch (e) {}
  }, [subject, chapters, tab, revised, best]);

  const S = SUBJECTS[subject];
  const chapter = chapters[subject] ?? 1;
  const ch = S.chapters.find((c) => c.n === chapter) ?? S.chapters[0];
  const searching = query.trim().length >= 2;

  const openChapter = (n, t = "notes", subj = subject) => {
    setSubject(subj);
    setChapters((c) => ({ ...c, [subj]: n }));
    setTab(t);
    setView("chapter");
    setQuery("");
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  };

  const switchSubject = (subj) => {
    setSubject(subj);
    setQuery("");
    if (view !== "sheet") setView("chapter");
  };

  const totalRevised = S.chapters.reduce((s, c) => s + chapterProgress(subject, c, revised, best).done, 0);
  const totalSections = S.chapters.reduce((s, c) => s + c.notes.length, 0);

  return (
    <div className="app">
      <header>
        <div className="bar">
          <div className="brand">
            <h1>ICSE Explorer</h1>
            <p>Class 10 Physics, Chemistry and Mathematics</p>
          </div>
          <div className="subjects" role="group" aria-label="Choose subject">
            {SUBJECT_ORDER.map((id) => (
              <button key={id} aria-pressed={subject === id} onClick={() => switchSubject(id)}>
                {SUBJECTS[id].name}
              </button>
            ))}
          </div>
          <button
            className="btn menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="chapter-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            Chapters
          </button>
          <div className="search">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all subjects, e.g. critical angle, Haber process, discriminant"
              aria-label="Search all chapters in all subjects"
            />
          </div>
          <button
            className={"btn" + (view === "sheet" && !searching ? " on" : "")}
            onClick={() => { setView("sheet"); setQuery(""); setMenuOpen(false); }}
          >
            {S.formulaLabel === "Equations" ? "Equation sheet" : "Formula sheet"}
          </button>
        </div>
      </header>

      <div className="layout">
        <nav id="chapter-nav" className={menuOpen ? "open" : ""} aria-label="Chapters">
          <div className="overall">
            <span className="track" aria-hidden="true">
              <i style={{ width: `${Math.round((totalRevised / totalSections) * 100)}%` }} />
            </span>
            <span>{totalRevised} of {totalSections} sections revised</span>
          </div>
          {S.units.map((u) => (
            <div key={u.id} className="unit">
              <div className="unit-h">Unit {u.id}: {u.name}</div>
              <ul>
                {u.chapters.map((n) => {
                  const c = S.chapters.find((x) => x.n === n);
                  const p = chapterProgress(subject, c, revised, best);
                  const current = view === "chapter" && !searching && n === chapter;
                  return (
                    <li key={n}>
                      <button aria-current={current} onClick={() => openChapter(n)}>
                        <span className="cn">{n}</span>
                        <span className="ct">{c.title}</span>
                        <span className="cp">
                          {p.done}/{p.total} revised
                          {p.best !== undefined && <>, quiz {p.best}/{c.quiz.length}</>}
                          {p.test !== undefined && <>, test {p.test}/10</>}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <main className="sheet" aria-live="polite">
          {searching ? (
            <SearchResults query={query.trim()} onOpen={openChapter} />
          ) : view === "sheet" ? (
            <FormulaSheet S={S} onOpen={openChapter} />
          ) : (
            <ChapterView
              S={S}
              ch={ch}
              tab={tab}
              setTab={setTab}
              revised={revised}
              setRevised={setRevised}
              best={best}
              setBest={setBest}
              onOpen={openChapter}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function ChapterView({ S, ch, tab, setTab, revised, setRevised, best, setBest, onOpen }) {
  const unit = S.units.find((u) => u.id === ch.unit);
  const prev = S.chapters.find((c) => c.n === ch.n - 1);
  const next = S.chapters.find((c) => c.n === ch.n + 1);
  return (
    <article>
      <div className="ch-head">
        <span className="ch-num" aria-hidden="true">{ch.n}</span>
        <div>
          <p className="ch-unit">{S.name}, unit {unit.id}: {unit.name}</p>
          <h2>{ch.title}</h2>
        </div>
      </div>
      <p className="lede">{ch.scope}</p>
      {ch.note && <p className="callout">{ch.note}</p>}

      <div className="tabs" role="tablist" aria-label="Chapter sections">
        {TABS.map(([id, label0]) => {
          const label = id === "formulas" ? S.formulaLabel : label0;
          return (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={tab === id ? "on" : ""}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
          );
        })}
      </div>

      <div role="tabpanel">
        {tab === "notes" && <Notes subj={S.id} subjName={S.name} ch={ch} revised={revised} setRevised={setRevised} />}
        {tab === "formulas" && <Formulas list={ch.formulas} />}
        {tab === "examples" && <Examples key={S.id + ch.n} list={ch.examples} />}
        {tab === "quiz" && <Quiz key={S.id + ch.n} subj={S.id} ch={ch} best={best} setBest={setBest} />}
        {tab === "test" && <UnitTest key={S.id + ch.n} subj={S.id} ch={ch} best={best} setBest={setBest} />}
      </div>

      <div className="pager">
        {prev ? <button className="btn" onClick={() => onOpen(prev.n, tab)}>Chapter {prev.n}: {prev.title}</button> : <span />}
        {next && <button className="btn" onClick={() => onOpen(next.n, tab)}>Chapter {next.n}: {next.title}</button>}
      </div>
    </article>
  );
}

function Notes({ subj, subjName, ch, revised, setRevised }) {
  const toggle = (k) =>
    setRevised((r) => {
      const n = { ...r };
      if (n[k]) delete n[k];
      else n[k] = true;
      return n;
    });
  return (
    <div className="notes">
      {ch.notes.map((sec, i) => {
        const k = rKey(subj, ch, i);
        return (
          <section key={k} className={revised[k] ? "done" : ""}>
            <div className="sec-head">
              <h3>{sec.h}</h3>
              <label className="rev">
                <input type="checkbox" checked={!!revised[k]} onChange={() => toggle(k)} />
                Revised
              </label>
            </div>
            <ul>
              {sec.pts.map((p, j) => <li key={j}>{p}</li>)}
            </ul>
          </section>
        );
      })}
      <aside className="video-ref">
        <h3>Video reference</h3>
        <p>
          <a href={youtubeUrl(subjName, ch.title)} target="_blank" rel="noopener noreferrer">
            Watch video lessons on {ch.title} on YouTube
          </a>
        </p>
        <p className="video-note">Opens a YouTube search for “ICSE Class 10 {subjName} {ch.title}” in a new tab.</p>
      </aside>
    </div>
  );
}

function Formulas({ list }) {
  return (
    <div className="formulas">
      {list.map((f, i) => (
        <div key={i} className="formula">
          <div className="f">{f.f}</div>
          <div className="fd">{f.d}</div>
        </div>
      ))}
    </div>
  );
}

function Examples({ list }) {
  const [open, setOpen] = useState({});
  return (
    <ol className="examples">
      {list.map((ex, i) => (
        <li key={i}>
          <p className="q">{ex.q}</p>
          <button
            className="btn small"
            aria-expanded={!!open[i]}
            onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
          >
            {open[i] ? "Hide solution" : "Show solution"}
          </button>
          {open[i] && (
            <div className="solution">
              {ex.s.map((line, j) => (
                <p key={j} className={j === ex.s.length - 1 ? "ans" : ""}>{line}</p>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

function Quiz({ subj, ch, best, setBest }) {
  const bk = bKey(subj, ch);
  const [picks, setPicks] = useState({});
  const [checked, setChecked] = useState(false);
  const score = ch.quiz.reduce((s, q, i) => s + (picks[i] === q.a ? 1 : 0), 0);
  const answered = Object.keys(picks).length;

  const check = () => {
    setChecked(true);
    if (best[bk] === undefined || score > best[bk]) setBest((b) => ({ ...b, [bk]: score }));
  };
  const reset = () => { setPicks({}); setChecked(false); };

  return (
    <div className="quiz">
      {ch.quiz.map((q, i) => (
        <fieldset key={i} disabled={checked}>
          <legend>{i + 1}. {q.q}</legend>
          {q.o.map((opt, j) => {
            const state = checked ? (j === q.a ? "right" : picks[i] === j ? "wrong" : "") : "";
            return (
              <label key={j} className={"opt " + state}>
                <input
                  type="radio"
                  name={`q${subj}${ch.n}-${i}`}
                  checked={picks[i] === j}
                  onChange={() => setPicks((p) => ({ ...p, [i]: j }))}
                />
                {opt}
              </label>
            );
          })}
          {checked && (
            <p className={"why " + (picks[i] === q.a ? "right" : "wrong")}>
              {picks[i] === q.a ? "Correct. " : picks[i] === undefined ? "Not answered. " : "Not quite. "}
              {q.e}
            </p>
          )}
        </fieldset>
      ))}
      <div className="quiz-bar">
        {checked ? (
          <>
            <strong>You scored {score} of {ch.quiz.length}.</strong>
            <span>Best: {Math.max(score, best[bk] ?? 0)} of {ch.quiz.length}</span>
            <button className="btn" onClick={reset}>Try again</button>
          </>
        ) : (
          <>
            <span>{answered} of {ch.quiz.length} answered</span>
            <button className="btn primary" onClick={check} disabled={answered === 0}>Check answers</button>
          </>
        )}
      </div>
    </div>
  );
}

function FormulaSheet({ S, onOpen }) {
  return (
    <article>
      <h2>{S.name} {S.formulaLabel.toLowerCase()} sheet</h2>
      <p className="lede">Every {S.formulaLabel.toLowerCase().replace(/s$/, "")} from the {S.chapters.length} {S.name.toLowerCase()} chapters in one place. Select a chapter name to open it. Use the subject switch at the top for the other subjects.</p>
      {S.chapters.map((c) => (
        <section key={c.n} className="sheet-sec">
          <h3><button className="link" onClick={() => onOpen(c.n, "formulas")}>{c.n}. {c.title}</button></h3>
          <Formulas list={c.formulas} />
        </section>
      ))}
    </article>
  );
}

function SearchResults({ query, onOpen }) {
  const hits = useMemo(() => {
    const q = query.toLowerCase();
    const out = [];
    SUBJECT_ORDER.forEach((subj) => SUBJECTS[subj].chapters.forEach((c) => {
      const items = [];
      c.notes.forEach((sec) => {
        sec.pts.forEach((p) => {
          if (p.toLowerCase().includes(q) || sec.h.toLowerCase().includes(q))
            items.push({ kind: "notes", text: p, where: sec.h });
        });
      });
      c.formulas.forEach((f) => {
        if ((f.f + " " + f.d).toLowerCase().includes(q))
          items.push({ kind: "formulas", text: `${f.f} — ${f.d}`, where: "Formula" });
      });
      c.examples.forEach((ex) => {
        if (ex.q.toLowerCase().includes(q))
          items.push({ kind: "examples", text: ex.q, where: "Solved example" });
      });
      if (items.length) out.push({ subj, c, items });
    }));
    return out;
  }, [query]);

  const count = hits.reduce((s, h) => s + h.items.length, 0);
  if (!count)
    return (
      <article>
        <h2>No matches</h2>
        <p className="lede">Nothing in any subject matches “{query}”. Try a shorter word, such as “lens” instead of “convex lenses”.</p>
      </article>
    );
  return (
    <article>
      <h2>{count} match{count > 1 ? "es" : ""}</h2>
      <p className="lede">For “{query}”. Select a result to open it in its chapter.</p>
      {hits.map(({ subj, c, items }) => (
        <section key={subj + c.n} className="results">
          <h3>{SUBJECTS[subj].name}, chapter {c.n}: {c.title}</h3>
          <ul>
            {items.slice(0, 12).map((it, i) => (
              <li key={i}>
                <button className="hit" onClick={() => onOpen(c.n, it.kind, subj)}>
                  <span><Highlight text={it.text} q={query} /></span>
                  <span className="where">{it.where}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}

function UnitTest({ subj, ch, best, setBest }) {
  const items = TESTS[subj]?.[ck(ch)] ?? [];
  const key = tKey(subj, ch);
  const [started, setStarted] = useState(false);
  const [picks, setPicks] = useState({});
  const [done, setDone] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!started || done) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [started, done]);

  const limit = TEST_MINUTES * 60;
  const left = Math.max(0, limit - elapsed);
  const score = items.reduce((s, q, i) => s + (picks[i] === q[2] ? 1 : 0), 0);
  const answered = Object.keys(picks).length;

  const submit = () => {
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (best[key] === undefined || score > best[key]) setBest((b) => ({ ...b, [key]: score }));
  };
  useEffect(() => { if (started && !done && left === 0) submit(); }, [left]);

  const restart = () => { setPicks({}); setDone(false); setElapsed(0); setStarted(true); };
  const mmss = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;

  if (!items.length) return <p className="lede">No unit test is available for this chapter yet.</p>;

  if (!started)
    return (
      <div className="test-intro">
        <h3>Unit test: {ch.title}</h3>
        <p>10 questions, 1 mark each, {TEST_MINUTES} minutes. The test submits itself when time runs out. These questions are different from the 5-question quiz.</p>
        {best[key] !== undefined && <p>Your best score so far: <strong>{best[key]}/10</strong></p>}
        <button className="btn primary" onClick={() => setStarted(true)}>Start test</button>
      </div>
    );

  const pct = Math.round((score / items.length) * 100);
  const verdict = pct >= 80 ? "Excellent. You are ready for this chapter." : pct >= 50 ? "Good effort. Review the questions you missed, then try again." : "Revise the notes and solved examples, then retake the test.";

  return (
    <div className="quiz test">
      <div className={"test-bar" + (left <= 60 && !done ? " warn" : "")}>
        {done ? (
          <span>Finished in {mmss(Math.min(elapsed, limit))}</span>
        ) : (
          <span>Time left: <strong>{mmss(left)}</strong></span>
        )}
        <span>{answered} of {items.length} answered</span>
      </div>

      {done && (
        <div className="result">
          <div className="score">{score}<span>/10</span></div>
          <div>
            <p className="pct">{pct}%</p>
            <p>{verdict}</p>
          </div>
        </div>
      )}

      {items.map(([q, opts, ans, why], i) => {
        const order = seededOrder(`${subj}-${ck(ch)}-${i}`, opts.length);
        return (
          <fieldset key={i} disabled={done}>
            <legend>{i + 1}. {q}</legend>
            {order.map((j) => {
              const state = done ? (j === ans ? "right" : picks[i] === j ? "wrong" : "") : "";
              return (
                <label key={j} className={"opt " + state}>
                  <input
                    type="radio"
                    name={`t${subj}${ck(ch)}-${i}`}
                    checked={picks[i] === j}
                    onChange={() => setPicks((p) => ({ ...p, [i]: j }))}
                  />
                  {opts[j]}
                </label>
              );
            })}
            {done && (
              <p className={"why " + (picks[i] === ans ? "right" : "wrong")}>
                {picks[i] === ans ? "Correct. " : picks[i] === undefined ? `Not answered. Answer: ${opts[ans]}. ` : `Answer: ${opts[ans]}. `}
                {why}
              </p>
            )}
          </fieldset>
        );
      })}

      <div className="quiz-bar">
        {done ? (
          <>
            <strong>You scored {score} of 10.</strong>
            <span>Best: {Math.max(score, best[key] ?? 0)} of 10</span>
            <button className="btn" onClick={restart}>Retake test</button>
          </>
        ) : (
          <>
            <span>{answered < items.length ? `${items.length - answered} unanswered` : "All answered"}</span>
            <button className="btn primary" onClick={submit}>Submit test</button>
          </>
        )}
      </div>
    </div>
  );
}
