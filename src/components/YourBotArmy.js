import React from "react";

function YourBotArmy({ bots, onRemoveBot, onDischarge }) {
  return (
    <div className="army-section">
      <h2 className="army-title">🪖 Your Bot Army</h2>
      <div className="cards-grid">
        {bots.length === 0 ? (
          <p className="empty-msg">No bots enlisted yet. Click on a bot to add it!</p>
        ) : (
          bots.map((bot) => (
            <div key={bot.id} className="card">
              <button
                className="discharge-btn"
                title="Discharge (delete permanently)"
                onClick={() => onDischarge(bot)}
              >
                ✖
              </button>

              <img src={bot.avatar_url} alt={bot.name} className="avatar" />
              <h3>{bot.name}</h3>
              <p className="bot-class">{bot.bot_class}</p>
              <p className="stats">HP: {bot.health} | DMG: {bot.damage} | ARM: {bot.armor}</p>

              <button
                className="release-btn"
                onClick={() => onRemoveBot(bot)}
              >
                Release
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default YourBotArmy;

