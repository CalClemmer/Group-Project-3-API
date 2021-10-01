require("dotenv").config();
const { Videogame } = require("./models");
const axios = require("axios");

const finishedVideogameJson = require("./models/api_data/finishedData.json");

// inserts final videogame data into mongodb
Videogame.insertMany(finishedVideogameJson, function (err, result) {
  if (err) {
    // handle error
  } else {
    // handle success
    console.log("Happy Days, inserted the finished database");
  }
});
