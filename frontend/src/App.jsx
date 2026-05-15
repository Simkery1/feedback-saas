import { useState, useEffect } from "react";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/weather?city=Paris")
      .then((res) => res.json())
      .then(setWeather);
  }, []);

  return (
    <div style={{ marginBottom: "24px", padding: "12px 16px", border: "1px solid #ddd", borderRadius: "8px", background: "#f9f9f9" }}>
      {weather
        ? <span>{weather.city} — {weather.temperature}°C, {weather.description}</span>
        : <span style={{ color: "#aaa" }}>Chargement...</span>
      }
    </div>
  );
}

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [title, setTitle] = useState("");

  async function fetchFeedbacks() {
    const res = await fetch("http://localhost:3000/feedbacks");
    setFeedbacks(await res.json());
  }

  useEffect(() => {
    fetch("http://localhost:3000/feedbacks")
      .then((res) => res.json())
      .then(setFeedbacks);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch("http://localhost:3000/feedbacks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    await fetchFeedbacks();
  }

  return (
    <div style={{ maxWidth: "480px", margin: "48px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "24px" }}>Feedback Board</h1>

      <WeatherWidget />

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nouvelle idée..."
          style={{ flex: 1, padding: "8px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", borderRadius: "6px", border: "none", background: "#333", color: "#fff", fontSize: "14px", cursor: "pointer" }}>
          Envoyer
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {feedbacks.map((f) => (
          <li key={f.id} style={{ padding: "10px 14px", marginBottom: "8px", border: "1px solid #eee", borderRadius: "6px", fontSize: "14px" }}>
            {f.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
