// import mongoose module
const mongoose = require("mongoose");

// object representation
// team schema
const teamSchema = mongoose.Schema({
    foundation: Number,
    name: String,
    owner: String,
    // FK that contains an array of _id (Player Model)
    playersId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player"
        }
    ],
    // FK: la valeur d'un _id du Stadium
    sId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Stadium"
    }
});

// affect model name to team schema
const team = mongoose.model("Team", teamSchema);
// make team exportable
module.exports = team;
