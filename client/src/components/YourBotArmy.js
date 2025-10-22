import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({ bots, onRemoveBot }) {
  return (
    <div>
      <h2>Your Bot Army</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {bots.map((bot) => (
          <div key={bot.id} onClick={() => onRemoveBot(bot)}>
            <BotCard bot={bot} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy;
