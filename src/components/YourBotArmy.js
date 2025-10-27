

import React from "react";

// FIX:
// 1. Changed 'bots' to 'army' to match the prop passed from App.js.
// 2. Added 'army = []' to prevent 'reading length of undefined' error.
// 3. Renamed onRemoveBot to onDelete (assuming onDischarge is for removing from army,
//    and we use another prop for permanent delete, which App.js passes as onDelete).
function YourBotArmy({ army = [], onDischarge, onDelete }) {
  return (
    <div className="army-section">
      <h2 className="army-title">🪖 Your Bot Army</h2>
      <div className="cards-grid">
        {/* Check the length of the 'army' array */}
        {army.length === 0 ? (
          <p className="empty-msg">No bots enlisted yet. Click on a bot to add it!</p>
        ) : (
          // Map over the 'army' array
          army.map((bot) => (
            <div key={bot.id} className="card">
              {/* This button will remove the bot from the army (onDischarge) */}
              <button
                className="release-btn"
                // Renamed from onRemoveBot to onDischarge/onDelete for clarity
                onClick={() => onDischarge(bot)}
              >
                Release
              </button>

              <img src={bot.avatar_url} alt={bot.name} className="avatar" />
              <h3>{bot.name}</h3>
              <p className="bot-class">{bot.bot_class}</p>
              <p className="stats">HP: {bot.health} | DMG: {bot.damage} | ARM: {bot.armor}</p>

              {/* This button performs the permanent deletion (onDelete) */}
              <button
                className="discharge-btn"
                title="Delete Permanently"
                onClick={() => onDelete(bot)} // Uses the correct onDelete handler
              >
                ✖
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default YourBotArmy;