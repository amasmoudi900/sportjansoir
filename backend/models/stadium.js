// import mongoose module
const mongoose = require("mongoose");

// object representation
// stadium schema
const stadiumSchema = mongoose.Schema({
    capacity: Number,
    name: String,
    country: String,
    // FK : la valeur de l'_id d'un Team
    tId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team" // model name
    }
});

// affect model name to stadium schema
const stadium = mongoose.model("Stadium", stadiumSchema);
// make stadium exportable
module.exports = stadium;
