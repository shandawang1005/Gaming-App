const mongoose = require("mongoose")

const connectMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://brucewang147862:abc123abc@cluster0.s94rk.mongodb.net/")
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.log("MongoDB connection failed:", error.message)
    }
}

module.exports = connectMongoDB