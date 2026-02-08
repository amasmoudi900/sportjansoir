// import express module
const express = require("express")
// import axios module
const axios = require("axios")

const router = express.Router();

// Business Logic: Search Weather By City Name
router.post("/weather", (req, res) => {
    console.log("Business Logic : Weather", req.body);
    let apiKey = "62ee756a34835483299877a61961cafb";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${apiKey}`;
    axios.get(apiURL).then(
        (apiResponse) => {
            console.log("Here is response from API", apiResponse.data);
            let weatherResult = {
                temp: apiResponse.data.main.temp,
                humidity: apiResponse.data.main.humidity,
                pressure: apiResponse.data.main.pressure,
                windSpeed: apiResponse.data.wind.speed,
                country: apiResponse.data.sys.country,
                icon: `http://openweathermap.org/img/wn/${apiResponse.data.weather[0].icon}@2x.png`

            }
            res.json({ obj: weatherResult });
        }
    )
});

// Business Logic: Search Team players
router.post("/searchTeamPlayers", (req, res) => {
    console.log("Business Logic: Search Team Players from API");
    let apiKey = "d3196f3fe48fdeac739a05e896baf473c846545444f93c7423813dfcd2f2220a"
    let apiURL = `https://apiv2.allsportsapi.com/football/?&met=Teams&teamName=${req.body.name}&APIkey=${apiKey}`;
    axios.get(apiURL).then(
        (apiResponse) => {
            console.log("Here is response from sports API", apiResponse.data);
            res.json({ sportResponse: apiResponse.data })
        }
    )
});

module.exports = router;