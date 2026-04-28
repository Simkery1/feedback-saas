import { useState } from "react";

// Composant principal de l'application
function App() {
  // State pour stocker le titre saisi
  const [title, setTitle] = useState("");

  // State pour stocker la liste des idées soumises
  const [ideas, setIdeas] = useState([]);

  // Fonction appelée au clic sur "Submit"
  function handleSubmit() {
    if (title.trim() === "") return; // Ignorer si vide
    setIdeas([...ideas, title]);    // Ajouter l'idée à la liste
    setTitle("");                    // Vider le champ
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Feedback Hub</h1>

      {/* Champ de saisie */}
      <input
        type="text"
        placeholder="Idea title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "8px", width: "70%", marginRight: "8px" }}
      />

      {/* Bouton de soumission */}
      <button onClick={handleSubmit} style={{ padding: "8px 16px" }}>
        Submit
      </button>

      {/* Liste des idées soumises */}
      <ul style={{ marginTop: "24px" }}>
        {ideas.map((idea, index) => (
          <li key={index}>{idea}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;