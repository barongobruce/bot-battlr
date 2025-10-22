import React from "react";
import BotCard from "./BotCard";

function BotCollection({ bots, onAddBot, onDeleteBot }) {
  return (
    <div className="bot-collection">
      {bots.map((bot) => (
        <BotCard
          key={bot.id}
          bot={bot}
          onClick={() => onAddBot(bot)}
          onDelete={onDeleteBot}
        />
      ))}
    </div>
  );
}

export default BotCollection;
