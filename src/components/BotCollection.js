
import React, { useEffect, useState } from "react";

function BotCollection({ onAddBot }) {
  const [bots, setBots] = useState([]);

  // Fetch bots from JSON server
  useEffect(() => {
    fetch("http://localhost:8001/bots")
      .then((res) => res.json())
      .then((data) => setBots(data))
      .catch((err) => console.error("Error fetching bots:", err));
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
      {bots.map((bot) => (
        <div
          key={bot.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            width: "200px",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => onAddBot(bot)}
        >
          <img src={bot.avatar_url} alt={bot.name} width="100" />
          <h3>{bot.name}</h3>
          <p>{bot.bot_class}</p>
          <p>HP: {bot.health} | DMG: {bot.damage} | Armor: {bot.armor}</p>
        </div>
      ))}
    </div>
  );
}

export default BotCollection;
