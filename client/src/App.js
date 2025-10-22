import React, { useState } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";

function App() {
  const [army, setArmy] = useState([]);

  // Add bot to army (only if not already enlisted)
  function handleAddBot(bot) {
    if (!army.find((b) => b.id === bot.id)) {
      setArmy([...army, bot]);
    }
  }

  // Remove bot from army
  function handleRemoveBot(bot) {
    setArmy(army.filter((b) => b.id !== bot.id));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>⚔️ Bot Battlr</h1>

      {/* Your Bot Army Section */}
      <YourBotArmy bots={army} onRemoveBot={handleRemoveBot} />

      <hr style={{ margin: "30px 0" }} />

      {/* Available Bots Section */}
      <h2 style={{ textAlign: "center" }}>🤖 Available Bots</h2>
      <BotCollection onAddBot={handleAddBot} />
    </div>
  );
}

export default App;
