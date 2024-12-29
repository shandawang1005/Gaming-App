const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    score: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
});

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;