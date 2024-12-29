const express = require("express");
const Progress = require("../models/Progress");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
    try {
        const progress = await Progress.find({ userId: req.user.id }).populate("gameId");
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: "Error fetching progress" });
    }
});

router.post("/", authenticate, async (req, res) => {
    const { gameId, score, level } = req.body;

    try {
        const progress = await Progress.findOneAndUpdate(
            { userId: req.user.id, gameId },
            { score, level },
            { new: true, upsert: true }
        );
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: "Error saving progress" });
    }
});

module.exports = router;
