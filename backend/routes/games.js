const express = require("express");
const Game = require("../models/Games");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: "Error fetching games" });
    }
});

router.post("/", authenticate, async (req, res) => {
    const { name, description, maxPlayers } = req.body;

    try {
        const newGame = new Game({ name, description, maxPlayers });
        await newGame.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ error: "Error creating game" });
    }
});

module.exports = router;
