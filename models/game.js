const mongoose = require("mongoose");

const roundSchema = new mongoose.Schema({
  winner: { type: String, required: true }, // 🔥 removed enum
}, { _id: false });

const gameSchema = new mongoose.Schema({
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  rounds: [roundSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Game", gameSchema);
