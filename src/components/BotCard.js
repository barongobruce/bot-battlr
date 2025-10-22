import React from "react";

function BotCard({ bot, onClick, onDelete }) {
  return (
    <div className="bot-card">
      <img
        src={bot.avatar_url}
        alt={bot.name}
        width="150"
        onClick={onClick}
      />
      <h3>{bot.name}</h3>
      <p>Class: {bot.bot_class}</p>
      <p>Health: {bot.health}</p>
      <p>Damage: {bot.damage}</p>
      <p>Armor: {bot.armor}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(bot);
        }}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "5px"
        }}
      >
        X
      </button>
    </div>
  );
}

export default BotCard;

