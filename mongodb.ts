import mongoose from "mongoose";
import * as dotenv from "dotenv";

export async function connectToMongoDB() {
    dotenv.config();

    if (!process.env.DB_URL) {
        throw new Error("DB_URL is not defined in .env");
    }

    try {
        await mongoose.connect(process.env.DB_URL, {} as mongoose.ConnectOptions);
        console.log("✅ Connected to MongoDB with Mongoose");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
}
