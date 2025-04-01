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

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // experience  Array d'objets (_id, titre, entreprise, dates, description)
    experience: {
        type: [
            {
                _id: false,
                titre: String,
                entreprise: String,
                dates: String,
                description: String,
            },
        ],
        required: false,
    },
    skills: {
        type: [String],
        required: false,
    },
    // information  Objet (bio, localisation, site web)
    information: {
        type: {
            bio: String,
            localisation: String,
            website: String,
        },
        required: false,
    },
});

export const User = mongoose.model('User', userSchema);