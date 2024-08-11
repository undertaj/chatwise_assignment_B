const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        description: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        comments: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Comment',
            required: false,
            default: []
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);