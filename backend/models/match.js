// import mongoose module
const mongoose = require("mongoose");

// object representation
// match schema
const matchSchema = mongoose.Schema({
    scoreOne: Number,
    scoreTwo: Number,
    teamOne: String,
    teamTwo: String
});

// affect model name to match schema
const match = mongoose.model("Match", matchSchema);
// make match exportable
module.exports = match;
