import React, { useState, useEffect } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import "./App.css";

// 🤖 IMPORTANT: Public API URL for deployment using My JSON Server
// The base URL for the bots resource is:
const API_URL = "https://my-json-server.typicode.com/barongobruce/bot-battlr/bots";

function App() {
  const [bots, setBots] = useState([]); // State for ALL available bots
  const [army, setArmy] = useState([]); // State for the enlisted bots

  // 1. Fetch all bots on mount
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBots(data))
      .catch((err) => console.error("Error fetching bots:", err));
  }, []);

  // 2. Add bot to army (only if not already enlisted)
  function handleAddBot(bot) {
    // Check if bot is already in the army
    if (!army.find((b) => b.id === bot.id)) {
      setArmy((prev) => [...prev, bot]);
    }
  }

  // 3. Release bot (remove from army only)
  function handleRemoveBot(bot) {
    setArmy((prev) => prev.filter((b) => b.id !== bot.id));
  }

  // 4. Discharge bot forever (DELETE from backend and remove from all lists)
  function handleDischarge(bot) {
    // **A. Remove from the Army state (YourBotArmy component)**
    setArmy((prev) => prev.filter((b) => b.id !== bot.id));
    
    // **B. Remove from the main Bots list state (BotCollection component)**
    setBots((prev) => prev.filter((b) => b.id !== bot.id));

    // **C. Delete on the backend (using My JSON Server)**
    // The endpoint to delete is API_URL / :id
    fetch(`${API_URL}/${bot.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          // Note: My JSON Server will accept the DELETE but won't persist the change
          console.warn("DELETE request succeeded on mock server, but changes won't persist.");
        }
      })
      .catch((err) => {
        console.error("Error deleting bot:", err);
      });
  }

  return (
    <div className="app-container">
      <h1 className="title">⚔️ Bot Battlr</h1>

      <YourBotArmy
        bots={army}
        onRemoveBot={handleRemoveBot}
        onDischarge={handleDischarge}
      />

      <hr className="divider" />

      <h2 className="subtitle">🤖 Available Bots</h2>
      <BotCollection 
        bots={bots} // Pass the full list of bots
        onAddBot={handleAddBot} 
      />
    </div>
  );
}

export default App;