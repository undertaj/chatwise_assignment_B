const { hash } = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        friend: {
            type: [mongoose.Schema.ObjectId],
            ref: 'User',
            required: false,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);