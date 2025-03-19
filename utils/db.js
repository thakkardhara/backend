const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        if (!URI) {
            throw new Error("MongoDB URI is missing.");
        }

        await mongoose.connect(URI, {
            dbName: "users", // Ensures it connects to the 'users' DB
        });

        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
