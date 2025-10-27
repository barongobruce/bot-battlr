import React from "react";
import BotCard from "./BotCard";
// REMOVED: import "./BotCollection.css"; // <-- This line caused the error

function BotCollection({ bots, onEnlist, onDelete, army }) {
  return (
    <div className="bot-collection">
      <h2>🤖 Bot Collection</h2>
      <div className="cards-grid">
        {bots.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            // CRITICAL FIX: Pass the onEnlist handler to the BotCard
            onEnlist={onEnlist} 
            onDelete={onDelete}
            // Pass isEnlisted status for visual styling (optional but good practice)
            isEnlisted={army.some(armyBot => armyBot.id === bot.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;