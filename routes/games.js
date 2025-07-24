const express = require("express");
const router = express.Router();
const Game = require("../models/game");

// Create new game session
router.post("/", async (req, res) => {
  const { player1, player2 } = req.body;
  try {
    const newGame = new Game({ player1, player2, rounds: [] });
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (err) {
    res.status(500).json({ error: "Failed to create game session" });
  }
});

// Get all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

// Add a new round
router.post("/:id/round", async (req, res) => {
  const { winner } = req.body;
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: "Game not found" });

    game.rounds.push({ winner });
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: "Failed to add round" });
  }
});

module.exports = router;
