import { useState, useMemo, useEffect, useRef } from "react";

/* ─── ASSETS ─────────────────────────────────────────────────────────────── */
const BEER_IMAGES = [
  "https://e7.pngegg.com/pngimages/826/366/png-clipart-liqueur-beer-bottle-goudale-black-albert-beer-distilled-beverage-beer-bottle.png",
  "https://e7.pngegg.com/pngimages/163/955/png-clipart-beer-beer.png",
  "https://e7.pngegg.com/pngimages/71/856/png-clipart-beer-bottle-glass-transparent.png",
  "https://e7.pngegg.com/pngimages/388/627/png-clipart-wheat-beer-pint-glass-lager-draft-beer-glass-beer.png",
];
const AVENGERS_IMAGES = [
  "https://e7.pngegg.com/pngimages/365/1021/png-clipart-marvel-iron-man-mask-iron-man-hd-face-superhero.png",
  "https://e1.pngegg.com/pngimages/104/145/png-clipart-robert-downey-jr-tony-stark.png",
  "https://e7.pngegg.com/pngimages/307/927/png-clipart-thor-guesthouse-youtube-thor-marvel-avengers-assemble-face.png",
  "https://e7.pngegg.com/pngimages/149/77/png-clipart-chris-hemsworth-thor-kim-hyde-actor-marvel-cinematic-universe-thor-marvel-avengers-assemble-face.png",
  "https://e7.pngegg.com/pngimages/86/795/png-clipart-captain-america-the-first-avenger-chris-evans-chris-evans-celebrities-film.png",
  "https://e7.pngegg.com/pngimages/405/909/png-clipart-the-incredible-hulk-youtube-emoji-hulk-face-marvel-avengers-assemble-leaf.png",
];
const AVENGER_NAMES = ["Iron Man", "Tony Stark", "Thor", "Chris Hemsworth", "Captain America", "Hulk"];

const CATEGORIES = [
  { label: "🚀 Révolution", value: "revolution" },
  { label: "🍺 Bière-related", value: "biere" },
  { label: "💤 Je sais pas", value: "sais-pas" },
  { label: "🔥 Urgence absolue", value: "urgence" },
  { label: "💅 Pour le swag", value: "swag" },
  { label: "🧠 Trop intelligent", value: "genius" },
  { label: "🗑️ Poubelle mais j'envoie", value: "poubelle" },
  { label: "👽 Came from another dimension", value: "alien" },
];

const MOODS = ["😴", "😐", "🙂", "😄", "🤩", "🥳", "😤", "🤯", "🥴", "🍺"];

const SUPERPOWERS = [
  "Super force",
  "Vol",
  "Invisibilité",
  "Télépathie",
  "Téléportation",
  "Génie niveau Tony Stark",
  "Résistance à la Goudale",
  "Parler aux pigeons",
];

const RANDOM_IDEAS = [
  "Remplacer les standups par des apéros Goudale",
  "Faire reviewer le code par Thor",
  "CI/CD géré par Hulk (il smash les bugs)",
  "4 jours / semaine, vendredi = LAN party",
  "Remplacer Jira par des post-its au plafond",
  "Captain America pour les réunions de sécurité",
  "Iron Man comme PM (il gère tout en 3 secondes)",
  "Donner un marteau à chaque dev",
  "Remplacer le café machine par une tireuse",
  "Chaque PR mergée = une Goudale offerte",
  "Télétravail depuis le Bifrost",
  "Objectif Q3 : conquérir les 9 royaumes",
];

const VOTE_EMOJIS = ["👍", "❤️", "🔥", "😂", "💀", "🫡"];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ─── CSS GLOBAL ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #f5e9c8; }

  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
  @keyframes bounceIn {
    0% { transform: scale(0.7) translateY(-20px); opacity: 0; }
    60% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); }
  }
  @keyframes confetti-fall {
    0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  @keyframes pop-up {
    0%   { transform: scale(0.5) translateY(0); opacity: 1; }
    100% { transform: scale(2) translateY(-40px); opacity: 0; }
  }
  @keyframes wiggle {
    0%,100% { transform: rotate(0deg); }
    25% { transform: rotate(-8deg); }
    75% { transform: rotate(8deg); }
  }
  @keyframes rainbow {
    0%   { color: #e74c3c; }
    16%  { color: #e67e22; }
    33%  { color: #f1c40f; }
    50%  { color: #2ecc71; }
    66%  { color: #3498db; }
    83%  { color: #9b59b6; }
    100% { color: #e74c3c; }
  }
  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes glowing {
    0%,100% { box-shadow: 0 0 5px #f0c040; }
    50%     { box-shadow: 0 0 20px #f0c040, 0 0 40px #e6a800; }
  }

  input:focus, textarea:focus, select:focus { outline: none; }

  .card-hover:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important; }
  .btn-hover:hover { transform: translateY(-2px); filter: brightness(1.05); }
  .btn-hover:active { transform: translateY(0); }
`;

/* ─── CONFETTI ───────────────────────────────────────────────────────────── */
function Confetti({ active }) {
  const pieces = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 1.5 + Math.random() * 2,
      color: ["#f0c040", "#e74c3c", "#3498db", "#2ecc71", "#9b59b6", "#e67e22"][i % 6],
      size: 6 + Math.random() * 10,
    })), []);

  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: "-20px",
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confetti-fall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── MOSAIC BACKGROUND ──────────────────────────────────────────────────── */
function MosaicBackground() {
  const COLS = 8, ROWS = 6, TOTAL = COLS * ROWS;
  const avengersPositions = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: 10 }, (_, i) => ({
      top: rand() * 90, left: rand() * 90,
      size: 80 + rand() * 60,
      src: AVENGERS_IMAGES[i % AVENGERS_IMAGES.length],
      rotate: (rand() - 0.5) * 30,
    }));
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)`, width: "100%", height: "100%" }}>
        {Array.from({ length: TOTAL }, (_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: i % 2 === 0 ? "#f5e9c8" : "#ede0b0", overflow: "hidden", padding: "8px" }}>
            <img src={BEER_IMAGES[i % BEER_IMAGES.length]} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.75 }} />
          </div>
        ))}
      </div>
      {avengersPositions.map((pos, i) => (
        <img key={i} src={pos.src} alt="" style={{ position: "absolute", top: `${pos.top}%`, left: `${pos.left}%`, width: `${pos.size}px`, transform: `rotate(${pos.rotate}deg)`, opacity: 0.85, pointerEvents: "none", filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.5))" }} />
      ))}
    </div>
  );
}

/* ─── IDEA CARD ──────────────────────────────────────────────────────────── */
function IdeaCard({ idea, onDelete, onStar }) {
  const [votes, setVotes] = useState({});
  const [popEmoji, setPopEmoji] = useState(null);

  function handleVote(emoji) {
    setVotes((v) => ({ ...v, [emoji]: (v[emoji] || 0) + 1 }));
    setPopEmoji(emoji);
    setTimeout(() => setPopEmoji(null), 700);
  }

  return (
    <li
      className="card-hover"
      style={{
        listStyle: "none",
        background: idea.starred
          ? "linear-gradient(135deg, #fff8c0, #ffe680)"
          : "linear-gradient(135deg, #fff8e7, #fff3d0)",
        border: `2px solid ${idea.starred ? "#f0c040" : "#eee"}`,
        borderRadius: "12px",
        padding: "14px 16px",
        marginBottom: "10px",
        position: "relative",
        boxShadow: idea.starred ? "0 0 12px rgba(240,192,64,0.4)" : "2px 3px 8px rgba(0,0,0,0.08)",
        transition: "all 0.2s",
        animation: "bounceIn 0.4s ease",
      }}
    >
      {popEmoji && (
        <span style={{ position: "absolute", top: 6, right: 40, fontSize: "22px", animation: "pop-up 0.7s ease forwards", pointerEvents: "none" }}>
          {popEmoji}
        </span>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
        <span style={{ fontSize: "22px", animation: idea.starred ? "wiggle 1s infinite" : "none" }}>
          {idea.mood}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "700", fontSize: "15px", marginBottom: "2px" }}>{idea.title}</div>
          {idea.description && (
            <div style={{ fontSize: "12px", color: "#666", fontStyle: "italic", marginBottom: "4px" }}>
              "{idea.description}"
            </div>
          )}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
            {idea.category && (
              <span style={{ background: "#fff0c0", border: "1px solid #f0c040", borderRadius: "20px", padding: "1px 8px", fontSize: "11px" }}>
                {CATEGORIES.find((c) => c.value === idea.category)?.label}
              </span>
            )}
            {idea.urgency > 7 && (
              <span style={{ background: "#ffe0e0", border: "1px solid #f44", borderRadius: "20px", padding: "1px 8px", fontSize: "11px", color: "#c00" }}>
                🚨 Urgence {idea.urgency}/10
              </span>
            )}
            {idea.beers > 0 && (
              <span style={{ background: "#e8f4ff", border: "1px solid #90caf9", borderRadius: "20px", padding: "1px 8px", fontSize: "11px" }}>
                🍺 ×{idea.beers}
              </span>
            )}
            {idea.avenger && (
              <span style={{ background: "#f3e8ff", border: "1px solid #ce93d8", borderRadius: "20px", padding: "1px 8px", fontSize: "11px" }}>
                🦸 {idea.avenger}
              </span>
            )}
            {idea.powers?.length > 0 && (
              <span style={{ background: "#e8ffe8", border: "1px solid #81c784", borderRadius: "20px", padding: "1px 8px", fontSize: "11px" }}>
                ⚡ {idea.powers.join(", ")}
              </span>
            )}
          </div>
          {idea.pseudo && (
            <div style={{ fontSize: "11px", color: "#aaa", marginTop: "4px" }}>— {idea.pseudo}</div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <button onClick={() => onStar(idea.id)} title="Coup de cœur" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", lineHeight: 1, opacity: idea.starred ? 1 : 0.3, transition: "opacity 0.2s" }}>⭐</button>
          <button onClick={() => onDelete(idea.id)} title="Supprimer" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", lineHeight: 1, opacity: 0.3, transition: "opacity 0.2s" }}>✕</button>
        </div>
      </div>

      {/* Votes */}
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {VOTE_EMOJIS.map((emoji) => (
          <button key={emoji} onClick={() => handleVote(emoji)} style={{ background: votes[emoji] ? "#fff0c0" : "#f5f5f5", border: `1px solid ${votes[emoji] ? "#f0c040" : "#ddd"}`, borderRadius: "20px", padding: "2px 8px", cursor: "pointer", fontSize: "12px", fontWeight: votes[emoji] ? "700" : "400", transition: "all 0.15s" }}>
            {emoji}{votes[emoji] ? ` ${votes[emoji]}` : ""}
          </button>
        ))}
      </div>
    </li>
  );
}

/* ─── PROGRESS BAR ───────────────────────────────────────────────────────── */
function QualityBar({ value }) {
  const color = value < 30 ? "#e74c3c" : value < 60 ? "#f0c040" : "#2ecc71";
  const label = value < 20 ? "💩 Nul" : value < 40 ? "😐 Bof" : value < 60 ? "🙂 Pas mal" : value < 80 ? "👍 Bien" : "🔥 INCROYABLE";
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#888", marginBottom: "4px" }}>
        <span>Qualité de l'idée</span>
        <span style={{ fontWeight: 700, color }}>{label}</span>
      </div>
      <div style={{ height: "6px", background: "#eee", borderRadius: "10px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: "10px", transition: "width 0.4s ease, background 0.4s ease" }} />
      </div>
    </div>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────────────────────── */
const EMPTY_FORM = { title: "", pseudo: "", description: "", category: "", mood: "😄", urgency: 5, beers: 0, avenger: "", powers: [] };

function App() {
  const appName = import.meta.env.VITE_APP_NAME;
  const [form, setForm] = useState(EMPTY_FORM);
  const [ideas, setIdeas] = useState([]);
  const [shake, setShake] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [sort, setSort] = useState("recent");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [darkTitle, setDarkTitle] = useState(false);
  const titleRef = useRef(null);

  // Qualité calculée selon les champs remplis
  const quality = useMemo(() => {
    let score = 0;
    if (form.title.trim().length > 5) score += 25;
    if (form.title.trim().length > 20) score += 10;
    if (form.description.trim().length > 10) score += 15;
    if (form.category) score += 10;
    if (form.pseudo.trim()) score += 10;
    if (form.avenger) score += 10;
    if (form.beers > 0) score += 5 * Math.min(form.beers, 4);
    if (form.powers.length > 0) score += 5;
    if (form.urgency >= 8) score += 5;
    return Math.min(score, 100);
  }, [form]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function togglePower(p) {
    setForm((f) => ({
      ...f,
      powers: f.powers.includes(p) ? f.powers.filter((x) => x !== p) : [...f.powers, p],
    }));
  }

  function handleSubmit() {
    if (form.title.trim() === "") {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      titleRef.current?.focus();
      return;
    }
    setIdeas((prev) => [{ ...form, id: Date.now(), starred: false }, ...prev]);
    setForm(EMPTY_FORM);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
    setShowAdvanced(false);
  }

  function handleRandom() {
    const idea = RANDOM_IDEAS[Math.floor(Math.random() * RANDOM_IDEAS.length)];
    set("title", idea);
    titleRef.current?.focus();
  }

  function handleDelete(id) { setIdeas((p) => p.filter((i) => i.id !== id)); }
  function handleStar(id) { setIdeas((p) => p.map((i) => i.id === id ? { ...i, starred: !i.starred } : i)); }

  const sorted = useMemo(() => {
    const copy = [...ideas];
    if (sort === "starred") copy.sort((a, b) => b.starred - a.starred);
    if (sort === "urgency") copy.sort((a, b) => b.urgency - a.urgency);
    if (sort === "beers") copy.sort((a, b) => b.beers - a.beers);
    return copy;
  }, [ideas, sort]);

  const urgencyEmoji = form.urgency <= 2 ? "😴" : form.urgency <= 4 ? "🙂" : form.urgency <= 6 ? "😬" : form.urgency <= 8 ? "😤" : "🚨";

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Confetti active={confetti} />
      <MosaicBackground />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "660px", margin: "30px auto 60px", fontFamily: "'Segoe UI', sans-serif", padding: "0 12px" }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1
            style={{ fontSize: "32px", fontWeight: "900", margin: 0, cursor: "pointer", animation: darkTitle ? "rainbow 1s linear infinite" : "none", userSelect: "none" }}
            onClick={() => setDarkTitle((d) => !d)}
          >
            🍺 {appName || "Feedback Board"}
          </h1>
          <p style={{ margin: "4px 0 0", color: "#666", fontSize: "13px", background: "rgba(255,255,255,0.7)", display: "inline-block", padding: "2px 10px", borderRadius: "20px" }}>
            (clique sur le titre pour un easter egg)
          </p>
        </div>

        {/* ── FORMULAIRE ── */}
        <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: "16px", padding: "24px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)", marginBottom: "20px" }}>

          <QualityBar value={quality} />

          {/* Titre + bouton random */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px", animation: shake ? "shake 0.5s ease" : "none" }}>
            <input
              ref={titleRef}
              type="text"
              placeholder="Titre de l'idée... 💡"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", border: "2px solid #e0e0e0", fontSize: "14px", transition: "border-color 0.2s" }}
              onFocus={(e) => (e.target.style.borderColor = "#f0c040")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
            <button
              className="btn-hover"
              onClick={handleRandom}
              title="Idée aléatoire"
              style={{ padding: "10px 12px", borderRadius: "10px", border: "2px solid #e0e0e0", background: "#fff", fontSize: "18px", cursor: "pointer", transition: "all 0.2s" }}
            >
              🎲
            </button>
          </div>

          {/* Pseudo */}
          <input
            type="text"
            placeholder="Ton pseudo (ou reste anonyme, lâche)"
            value={form.pseudo}
            onChange={(e) => set("pseudo", e.target.value)}
            style={{ width: "100%", padding: "9px 14px", borderRadius: "10px", border: "2px solid #e0e0e0", fontSize: "13px", marginBottom: "12px", transition: "border-color 0.2s" }}
            onFocus={(e) => (e.target.style.borderColor = "#f0c040")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
          />

          {/* Catégorie */}
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            style={{ width: "100%", padding: "9px 14px", borderRadius: "10px", border: "2px solid #e0e0e0", fontSize: "13px", marginBottom: "12px", background: "#fff", cursor: "pointer" }}
          >
            <option value="">— Catégorie (obligatoire si t'es sérieux) —</option>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>

          {/* Mood selector */}
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}>Ton humeur en ce moment</div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {MOODS.map((m) => (
                <button
                  key={m}
                  onClick={() => set("mood", m)}
                  style={{ fontSize: "22px", background: form.mood === m ? "#fff0c0" : "transparent", border: `2px solid ${form.mood === m ? "#f0c040" : "transparent"}`, borderRadius: "8px", padding: "2px 4px", cursor: "pointer", transition: "all 0.15s", transform: form.mood === m ? "scale(1.2)" : "scale(1)" }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle champs avancés */}
          <button
            onClick={() => setShowAdvanced((s) => !s)}
            style={{ background: "none", border: "none", color: "#f0a000", fontSize: "13px", cursor: "pointer", fontWeight: "600", marginBottom: showAdvanced ? "12px" : "0", padding: 0 }}
          >
            {showAdvanced ? "▲ Masquer les champs inutiles" : "▼ Afficher encore plus de champs inutiles"}
          </button>

          {showAdvanced && (
            <div style={{ animation: "slideDown 0.3s ease" }}>
              {/* Description */}
              <textarea
                placeholder="Description optionnelle... ou épanche-toi"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                style={{ width: "100%", padding: "9px 14px", borderRadius: "10px", border: "2px solid #e0e0e0", fontSize: "13px", resize: "vertical", marginBottom: "12px", fontFamily: "inherit", transition: "border-color 0.2s" }}
                onFocus={(e) => (e.target.style.borderColor = "#f0c040")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
              />

              {/* Urgence slider */}
              <div style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                  <span>Niveau d'urgence {urgencyEmoji}</span>
                  <span style={{ fontWeight: 700, color: form.urgency >= 8 ? "#e74c3c" : "#333" }}>{form.urgency}/10</span>
                </div>
                <input
                  type="range" min={1} max={10} value={form.urgency}
                  onChange={(e) => set("urgency", +e.target.value)}
                  style={{ width: "100%", accentColor: form.urgency >= 8 ? "#e74c3c" : "#f0c040" }}
                />
              </div>

              {/* Bières bus */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <span style={{ fontSize: "12px", color: "#888", flex: 1 }}>Bières bus pour avoir cette idée</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button onClick={() => set("beers", Math.max(0, form.beers - 1))} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "2px solid #e0e0e0", background: "#fff", fontSize: "16px", cursor: "pointer", lineHeight: 1 }}>−</button>
                  <span style={{ fontSize: "16px", fontWeight: "700", minWidth: "30px", textAlign: "center" }}>
                    {"🍺".repeat(Math.min(form.beers, 6))}{form.beers > 6 ? `+${form.beers - 6}` : ""}
                    {form.beers === 0 && "0"}
                  </span>
                  <button onClick={() => set("beers", form.beers + 1)} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "2px solid #f0c040", background: "#fff8e0", fontSize: "16px", cursor: "pointer", lineHeight: 1 }}>+</button>
                </div>
              </div>

              {/* Avenger sponsor */}
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}>Avenger qui sponsorise cette idée</div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {AVENGER_NAMES.map((a, i) => (
                    <label key={a} style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", background: form.avenger === a ? "#f3e8ff" : "#f5f5f5", border: `1px solid ${form.avenger === a ? "#ce93d8" : "#ddd"}`, borderRadius: "8px", padding: "4px 8px", fontSize: "12px", fontWeight: form.avenger === a ? 700 : 400, transition: "all 0.15s" }}>
                      <img src={AVENGERS_IMAGES[i]} alt={a} style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                      <input type="radio" name="avenger" value={a} checked={form.avenger === a} onChange={() => set("avenger", a)} style={{ display: "none" }} />
                      {a}
                    </label>
                  ))}
                </div>
              </div>

              {/* Superpowers */}
              <div style={{ marginBottom: "4px" }}>
                <div style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}>Superpouvoir(s) requis ⚡</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {SUPERPOWERS.map((p) => (
                    <label key={p} style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", background: form.powers.includes(p) ? "#e8ffe8" : "#f5f5f5", border: `1px solid ${form.powers.includes(p) ? "#81c784" : "#ddd"}`, borderRadius: "8px", padding: "3px 8px", fontSize: "11px", fontWeight: form.powers.includes(p) ? 700 : 400, transition: "all 0.15s" }}>
                      <input type="checkbox" checked={form.powers.includes(p)} onChange={() => togglePower(p)} style={{ display: "none" }} />
                      {form.powers.includes(p) ? "✓ " : ""}{p}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            className="btn-hover"
            onClick={handleSubmit}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "13px",
              borderRadius: "12px",
              border: "none",
              background: quality >= 70 ? "linear-gradient(135deg, #2ecc71, #27ae60)" : "linear-gradient(135deg, #f0c040, #e6a800)",
              color: "#fff",
              fontWeight: "800",
              fontSize: "16px",
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "all 0.2s",
              animation: quality >= 90 ? "glowing 1.5s infinite" : "none",
            }}
          >
            {quality >= 70 ? "🚀 ENVOYER CETTE PÉPITE" : quality >= 40 ? "📤 Soumettre l'idée" : "🗑️ Soumettre quand même"}
          </button>
        </div>

        {/* ── LISTE ── */}
        {ideas.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", background: "rgba(255,255,255,0.8)", borderRadius: "10px", padding: "8px 14px" }}>
              <span style={{ fontSize: "13px", fontWeight: "600" }}>
                {ideas.length} idée{ideas.length > 1 ? "s" : ""} 🧠 ({ideas.filter((i) => i.starred).length} ⭐)
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{ fontSize: "12px", border: "1px solid #ddd", borderRadius: "8px", padding: "3px 6px", background: "#fff", cursor: "pointer" }}
              >
                <option value="recent">🕐 Plus récentes</option>
                <option value="starred">⭐ Coups de cœur</option>
                <option value="urgency">🚨 Par urgence</option>
                <option value="beers">🍺 Par bières</option>
              </select>
            </div>

            <ul style={{ padding: 0, margin: 0 }}>
              {sorted.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} onDelete={handleDelete} onStar={handleStar} />
              ))}
            </ul>
          </>
        )}

        {ideas.length === 0 && (
          <div style={{ textAlign: "center", color: "#888", padding: "32px", background: "rgba(255,255,255,0.7)", borderRadius: "12px", fontSize: "14px" }}>
            <div style={{ fontSize: "40px", marginBottom: "8px" }}>💭</div>
            Aucune idée pour l'instant...<br />
            <span style={{ fontSize: "12px", color: "#aaa" }}>appuie sur 🎲 si t'as rien</span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
