const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        commentedBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);