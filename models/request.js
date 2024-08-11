const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        to: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
    }
);

module.exports = mongoose.model("Request", requestSchema);