import mongoose from "mongoose";

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
    friends: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required: false,
    },
});

export const User = mongoose.model('User', userSchema);