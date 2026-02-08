// import express module
const express = require("express");

// router : mini app for navigation
const router = express.Router();

const Match = require("../models/match");
// Business Logic: Get All Matches
router.get("/", (req, res) => {
    console.log("Business Logic : Get All Matches");
    Match.find().then((tab) => {
        console.log("Here is tab (tableau d'objets récupérés de la collection matches", tab);
        res.json({ matches: tab })
    });
});

// Business Logic : Get Match By ID
router.get("/:id", (req, res) => {
    console.log("Business Logic : Get Match By ID");
    let matchId = req.params.id;
    console.log("Here is matchId", matchId);
    Match.findById(matchId).then(
        (doc) => {
            console.log("Here is doc from matches collection", doc);
            doc ? res.json({ foundMatch: doc }) : res.json({ msg: "Match Not Found" });
        }
    )
});

// Business Logic: Delete Match By ID
router.delete("/:id", (req, res) => {
    console.log("Business Logic : Delete Match By ID");
    let matchId = req.params.id;
    console.log("Here is matchId", matchId);
    Match.deleteOne({ _id: matchId }).then(
        (deleteResponse) => {
            console.log("Here is delete response from matches collection", deleteResponse);
            (deleteResponse.deletedCount == 1) ?
                res.json({ msg: "Match is deleted with success", isDeleted: true }) :
                res.json({ msg: "Match is not deleted", isDeleted: false });
        }
    )
});

// Business Logic : Add Match
router.post("/", (req, res) => {
    console.log("Business Logic : Add Match");
    let match = new Match(req.body);
    match.save((err, doc) => {
        console.log("Here is error (-)", err);
        console.log("Here is document (+)", doc);
        err ? res.json({ msg: "Match Not Added !" }) : res.json({ msg: "Match Added with Success" });
    });
});

// Business Logic : Update Match
router.put("/", (req, res) => {
    console.log("Business Logic : Edit Match");
    // Get object from request
    let match = req.body;
    console.log("Here is match", match);
    Match.updateOne({ _id: match._id }, match).then(
        (updateResponse) => {
            console.log("Here is update response", updateResponse);
            (updateResponse.nModified == 1) ?
                res.json({ msg: "Edited with Success", isUpdated: true }) :
                res.json({ msg: "Match Not Edited", isUpdated: false });
        }
    )
});

// Business Logic : Search Matches By Team Name
router.get("/search/:teamName", (req, res) => {
    console.log("Business Logic : Search matches by team name");
    let teamName = req.params.teamName;
    Match.find({ $or: [{ teamOne: teamName }, { teamTwo: teamName }] }).then(
        (tab) => {
            console.log("Here is tab from matches collection", tab);
            (tab.length == 0) ?
                res.json({ msg: `No matches found with team name ${teamName}` }) :
                res.json({ matches: tab });
        }
    )
});

// make router exportable
module.exports = router;