import React, { useState, useEffect } from "react";
import "./App.css";

// ➡️ Define the public API URL here
const API_URL = "https://my-json-server.typicode.com/barongobruce/bot-battlr/bots";

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);

  // Fetch bots from the public API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBots(data))
      .catch((err) => console.error("Error fetching bots:", err));
  }, []);

  // Function to enlist a bot
  const enlistBot = (bot) => {
    if (!army.find((b) => b.id === bot.id)) {
      setArmy([...army, bot]);
    }
  };

  // Function to release a bot
  const releaseBot = (id) => {
    setArmy(army.filter((bot) => bot.id !== id));
  };

  // Function to discharge (delete) a bot permanently
  const dischargeBot = (id) => {
    // ➡️ Use the API_URL for the DELETE request
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setArmy(army.filter((bot) => bot.id !== id));
      setBots(bots.filter((bot) => bot.id !== id));
    });
  };

  return (
    <div className="App">
      <h1>⚔️ Bot Battlr</h1>

      <section>
        <h2>🪖 Your Bot Army</h2>
        {army.length === 0 ? (
          <p>No bots enlisted yet. Click on a bot to add it!</p>
        ) : (
          <div className="bot-army">
            {army.map((bot) => (
              <div key={bot.id} className="bot-card" onClick={() => releaseBot(bot.id)}>
                <img src={bot.avatar_url} alt={bot.name} />
                <h3>{bot.name}</h3>
                <button
                  className="discharge-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    dischargeBot(bot.id);
                  }}
                >
                  ❌ Discharge
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>🤖 Available Bots</h2>
        <div className="bot-collection">
          {bots.map((bot) => (
            <div key={bot.id} className="bot-card" onClick={() => enlistBot(bot)}>
              <img src={bot.avatar_url} alt={bot.name} />
              <h3>{bot.name}</h3>
              <p>{bot.bot_class}</p>
              <p>❤️ {bot.health} | ⚔️ {bot.damage} | 🛡️ {bot.armor}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
