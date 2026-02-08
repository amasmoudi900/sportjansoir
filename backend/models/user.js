// import mongoose module
const mongoose = require("mongoose");

// object representation
// user schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    pwd: String,
    role: String,
    photo: String // path du fichier
});

// affect model name to user schema
const user = mongoose.model("User", userSchema);
// make user exportable
module.exports = user;
