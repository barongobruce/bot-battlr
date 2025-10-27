import React, { useState, useEffect } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import "./App.css";

// This is the public endpoint you were trying to fix earlier
const BOTS_API = "https://bot-battlr-api.onrender.com/bots";

function App() {
  // FIX: Initialize bots as an empty array [] to prevent the "bots.map is not a function" error
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);

  // Fetch all bots on initial component mount
  useEffect(() => {
    fetch(BOTS_API)
      .then((r) => r.json())
      .then((data) => setBots(data))
      .catch((error) => console.error("Error fetching bots:", error));
  }, []);

  // Handler to add a bot to the army
  const enlistBot = (bot) => {
    // Prevent enlisting a bot if it's already in the army
    if (!army.find((b) => b.id === bot.id)) {
      setArmy([...army, bot]);
    }
  };

  // Handler to remove a bot from the army
  const dischargeBot = (bot) => {
    setArmy(army.filter((b) => b.id !== bot.id));
  };
  
  // Optional: Handler to permanently delete a bot from the backend and the UI
  const deleteBot = (bot) => {
    // 1. Send DELETE request to the backend
    fetch(`${BOTS_API}/${bot.id}`, {
      method: 'DELETE'
    })
    .then(r => {
      if (r.ok) {
        // 2. Remove from the local army state (if present)
        setArmy(army.filter((b) => b.id !== bot.id));

        // 3. Remove from the local bots collection state
        setBots(bots.filter((b) => b.id !== bot.id));
      } else {
        console.error("Failed to delete bot on server.");
      }
    })
    .catch((error) => console.error("Error deleting bot:", error));
  };

  return (
    <div className="App">
      <YourBotArmy 
        army={army} 
        onDischarge={dischargeBot} 
        onDelete={deleteBot}
      />
      <BotCollection 
        bots={bots} 
        onEnlist={enlistBot} 
        onDelete={deleteBot} 
        army={army} // Pass army to allow BotCollection to disable enlisted bots
      />
    </div>
  );
}

export default App;