const connectMongoDB = require("./config/db");
require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const authRoutes = require("./routes/auth")
const gameRoutes = require("./routes/games");
const progressRoutes = require("./routes/progress");
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/api/auth", authRoutes)
app.use("/api/games", gameRoutes)
app.use("/api/progress", progressRoutes);


connectMongoDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })