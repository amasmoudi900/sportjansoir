// import mongoose module
const mongoose = require("mongoose");

// object representation
// player schema
const playerSchema = mongoose.Schema({
    age: Number,
    nbr: Number,
    name: String,
    position: String,
    // FK that contains the value of _id (Team Model)
    tId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team" // model name
    }
});

// affect model name to player schema
const player = mongoose.model("Player", playerSchema);
// make player exportable
module.exports = player;
