const express = require("express");
const router = express.Router();

const { Videogame } = require("../models"); // import stuff

router.get("/", async (req, res) => {
  try {
    let allGames = await Videogame.find({});

    res.status(200).json({
      games: allGames,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error. Please try again.",
    });
  }
});

module.exports = router;
