// import express module
const express = require("express");
// import cors module
const cors = require("cors");
// import mongoose module
const mongoose = require("mongoose");
// mongodb://127.0.0.1:27017 : MongoDB server address
// sportJanDB : DB name
mongoose.connect('mongodb://127.0.0.1:27017/sportJanDB');
// import bcrypt module
const bcrypt = require("bcrypt");
// import jsonwebtoken module
const jwt = require("jsonwebtoken");
// import express-session module
const session = require("express-session");
// import multer module
const multer = require("multer");
// import path module
const path = require("path");
// import axios module
const axios = require("axios");

const { ObjectId } = require('mongoose').Types.ObjectId;
// creates an express application named 'app'
const app = express();


// App configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const secretKey = 'croco2026FSJS-soir';
app.use(session({
    secret: secretKey,
}));
// /images replace backend/uploads (DB)
app.use('/images', express.static(path.join('backend/uploads')));
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/uploads"); // "backend/uploads" : l'emplacement
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Routes files importation
const matchRoutes = require("./routes/match-routes");
const apiRoutes = require("./routes/api-routes");

// http://localhost:3000/matches/.....
app.use("/matches", matchRoutes);
// http://localhost:3000/api/.....
app.use("/api", apiRoutes);

// Models Importation
const Player = require("./models/player");
const Team = require("./models/team");
const User = require("./models/user");
const Stadium = require("./models/stadium");

// DataBase simulation
let teamsTab = [
    { id: 1, name: "FCB", foundation: 1992, owner: "SALAH" },
    { id: 2, name: "RMD", foundation: 1990, owner: "ALI" },
    { id: 3, name: "CA", foundation: 1902, owner: "Med" }
];

let playersTab = [
    { id: 1, name: "Messi", age: 40, position: "ATK", nbr: 10, teamId: 1 },
    { id: 2, name: "CR7", age: 44, position: "DEF", nbr: 7, teamId: 3 },
    { id: 3, name: "Xavi", age: 47, position: "MID", nbr: 6, teamId: 1 }
];


// Business Logic 
// app.ACTION_HTTP("/PATH", (req, res) => { });
app.get("/players/search/:playerName", (req, res) => {
    console.log("Business Logic : Search Player Info + Team");
    let pName = req.params.playerName;
    console.log("Here is player name", pName);
    let foundPlayer = playersTab.find((elt) => elt.name == pName);
    if (!foundPlayer) {
        res.json({ msg: `Player ${pName} is Not Found` });
    } else {
        let foundTeam = teamsTab.find((elt) => elt.id == foundPlayer.teamId);
        if (!foundTeam) {
            res.json({ msg: `Player ${pName} is Not affected to any Team`, player: foundPlayer });
        } else {
            res.json({ player: foundPlayer, team: foundTeam });
        }
    }
});

app.get("/teams/search/:teamName", (req, res) => {
    console.log("Business Logic : Search Team Info + Players List");
    let tName = req.params.teamName;
    console.log("Here is team name", tName);
    let foundTeam = teamsTab.find((elt) => elt.name == tName);
    if (!foundTeam) {
        res.json({ msg: ` No Team found with name: ${tName}` });
    } else {
        let foundPlayers = playersTab.filter((elt) => elt.teamId == foundTeam.id);
        (foundPlayers.length == 0) ?
            res.json({ msg: "No found players for this team", team: foundTeam }) :
            res.json({ players: foundPlayers, team: foundTeam });
    }
});




// Business Logic : Signup
// 1 : User Added with Success
// 2 : User Already Exists
// 3 : User Not saved
app.post("/users/signup", multer({ storage: storageConfig }).single("img"), (req, res) => {
    console.log("Business Logic : Signup", req.body);
    let user = req.body;
    // Check if User exists By Email
    User.findOne({ email: user.email }).then(
        (foundUser) => {
            console.log("Here is found user", foundUser);
            if (!foundUser) {
                bcrypt.hash(user.pwd, 10).then(
                    (cryptedPwd) => {
                        console.log("HERE is crypted pwd", cryptedPwd);
                        user.pwd = cryptedPwd;
                        // if (req.file) {
                        //     // http://localhost:3000 : Express Base URL
                        //     // images : shortcut (backend/uploads)
                        //     user.photo = "http://localhost:3000/images/" + req.file.filename;
                        // } else {
                        //     user.photo = "http://localhost:3000/images/a.png";
                        // }

                        user.photo = (req.file) ?
                            "http://localhost:3000/images/" + req.file.filename :
                            "http://localhost:3000/images/a.jpg";

                        // save object
                        let userObj = new User(user);
                        userObj.save(
                            (err, doc) => {
                                err ?
                                    res.json({ msg: "3" }) :
                                    res.json({ msg: "1" });
                            }
                        )
                    }
                )
            } else {
                res.json({ msg: "2" });
            }
        }
    )
});


// Business Logic : Login
// 1 : Check Your Email
// 2 : Check Your PWD
// 3 : Welcome
app.post("/users/login", (req, res) => {
    console.log("Business Logic : Login", req.body);
    // Search User By Email
    User.findOne({ email: req.body.email }).then(
        (foundUser) => {
            console.log("Here is found user", foundUser);
            // foundUser is null
            if (!foundUser) {
                return res.json({ msg: "1" });
            }
            // User exists By email => compare PWDs
            bcrypt.compare(req.body.pwd, foundUser.pwd).then(
                (pwdResult) => {
                    console.log("Here is pwd result", pwdResult);
                    // pwdResult == false
                    if (!pwdResult) {
                        return res.json({ msg: "2" });
                    }
                    let userToSend = {
                        role: foundUser.role,
                        fName: foundUser.firstName,
                        lName: foundUser.lastName,
                        id: foundUser._id
                    }
                    let token = jwt.sign(userToSend, secretKey, { expiresIn: "1d" });
                    res.json({ msg: "3", user: token });
                }
            )
        }
    )
});


// Business Logic : Add Team
app.post("/teams", (req, res) => {
    console.log("Business Logic : Add Team", req.body);
    let teamObj = new Team(req.body);
    teamObj.save();
    res.json({ msg: "Added With Success" });
});

// Business Logic : Get All Teams
app.get("/teams", (req, res) => {
    console.log("Business Logic : Get All Teams");
    Team.find().populate("playersId").then(
        (docs) => {
            res.json({ teamsTab: docs });
        }
    )
});


// Business Logic : Add Player
app.post("/players", (req, res) => {
    console.log("Business Logic : Add Player", req.body);
    // Check if team exixts
    Team.findById(req.body.teamId).then(
        (foundTeam) => {
            console.log("Here is found team", foundTeam);
            // foundTeam is null
            if (!foundTeam) {
                return res.json({ msg: "Team Not Found !!!" });
            }
            // foundTeam : {_id:..., name:..., owner: ..., foundation:....}
            let playerObj = new Player({
                name: req.body.name,
                age: req.body.age,
                position: req.body.position,
                nbr: req.body.nbr,
                tId: new ObjectId(req.body.teamId)
            });
            playerObj.save(
                (err, doc) => {
                    // err : error
                    // doc : {_id : ..., name : ...., age : ...., position : ...., nbr: ....}
                    if (err) {
                        res.json({ msg: "Player Not saved" });
                    } else {
                        // affect player _id into team 
                        foundTeam.playersId.push(doc._id);
                        foundTeam.save();
                        res.json({ msg: "Player saved with success" });
                    }
                }
            );
        }
    );
});

// Business Logic : Get All Players
app.get("/players", (req, res) => {
    console.log("Business Logic : Get All Players");
    Player.find().populate("tId").then(
        (docs) => {
            res.json({ tab: docs })
        }
    )
});


// Business Logic: Add stadium
app.post("/stadiums", (req, res) => {
    console.log("Business Logic: Add Stadium", req.body);
    // search team by ID
    Team.findById(req.body.teamId).then(
        (foundTeam) => {
            console.log("Here is foundTeam", foundTeam);
            if (!foundTeam) {
                return res.json({ msg: "Team Not Found" });
            }

            let stadiumObj = new Stadium({
                name: req.body.name,
                country: req.body.country,
                capacity: req.body.capacity,
                tId: new ObjectId(req.body.teamId)
            });

            stadiumObj.save(
                (err, doc) => {
                    if (err) {
                        res.json({ msg: "Stadium Not saved" })
                    } else {
                        foundTeam.sId = doc._id;
                        foundTeam.save();
                        res.json({ msg: "Stadium is saved" })
                    }
                }
            )
        }
    )
});



// make app importable from another files
module.exports = app;