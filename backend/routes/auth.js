const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
const authenticate = require("../middlewares/authMiddleware")

const JWT_SECRET = process.env.JWT_SECRET || "randomKey"
const User = require("../models/Users");


router.post("/register", async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ error: "All Field are required" })
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists." });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Server error." });
    }
});


router.post("/login", async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ error: "Username and Password are required" })

    }

    try {
        const user = await User.findOne({ username })
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                error: "Invalid Username or Password"
            })
        }
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
            expiresIn: "1h"
        })
        res.json({ token })

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error." });
    }


})

router.get("/profile", authenticate, async (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!` })
})






module.exports = router