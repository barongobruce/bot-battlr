import React, { useState } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import "./App.css"; // import CSS (create file below)

function App() {
  const [army, setArmy] = useState([]);

  // Add bot to army (only if not already enlisted)
  function handleAddBot(bot) {
    if (!army.find((b) => b.id === bot.id)) {
      setArmy([...army, bot]);
    }
  }

  // Release (remove from army only)
  function handleRemoveBot(bot) {
    setArmy((prev) => prev.filter((b) => b.id !== bot.id));
  }

  // Discharge (delete from backend and remove from army)
  function handleDischarge(bot) {
    // Optimistically remove from state first
    setArmy((prev) => prev.filter((b) => b.id !== bot.id));

    // Delete on backend
    fetch(`http://localhost:8001/bots/${bot.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete bot");
        }
      })
      .catch((err) => {
        console.error("Error deleting bot:", err);
        // On error, optionally re-add bot to army (rollback)
        // setArmy((prev) => [...prev, bot]);
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
      <BotCollection onAddBot={handleAddBot} />
    </div>
  );
}

export default App;

