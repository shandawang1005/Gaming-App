const mongoose = require("mongoose")

const gameScheme = new mongoose.Schema({
    name: { type: String, required: true }
    , description: { type: String },
    maxPlayers: { type: Number, default: 1 }, 
    createdAt: { type: Date, default: Date.now },
})
const Game = mongoose.model("Game", gameScheme)

module.exports = Game