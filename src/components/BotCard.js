import React from "react";

// FIX: Renamed 'onClick' to 'onEnlist' for clarity, which is how it should be used.
function BotCard({ bot, onEnlist, onDelete }) {
  // Determine if the card should be styled differently if already in the army
  
  return (
    // FIX: Attach the onEnlist handler to the main card div.
    // The handler function passed down from App.js needs the bot object.
    <div className="bot-card" onClick={() => onEnlist(bot)}> 
      <img
        src={bot.avatar_url}
        alt={bot.name}
        width="150"
        // Removed onClick from <img> as it's on the parent div now
      />
      <h3>{bot.name}</h3>
      <p>Class: {bot.bot_class}</p>
      <p>Health: {bot.health}</p>
      <p>Damage: {bot.damage}</p>
      <p>Armor: {bot.armor}</p>
      
      {/* Permanent Delete Button */}
      <button
        onClick={(e) => {
          // Stop propagation prevents the click from reaching the parent div's onEnlist handler
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
          marginTop: "5px",
        }}
      >
        X
      </button>
    </div>
  );
}

export default BotCard;