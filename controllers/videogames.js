const express = require("express");
const router = express.Router();

const { Videogame } = require("../models"); // import stuff

// find all games
router.get("/", async (req, res) => {
  try {
    let allGames = await Videogame.find({}).sort({ total_rating_count: -1 });
    //it's a bit silly just how huge the entire file is
    //.limit(500); usually we want a limit cuz uh... too big a file lol

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

// find game info by index
router.get("/index/:idx", async (req, res) => {
  let game = await Videogame.find({ id: req.params.idx });
  try {
    res.status(200).json({
      game: game,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error. Please try again.",
    });
  }
});

// finds top 20 games
router.get("/trending/", async (req, res) => {
  let trending = await Videogame.find({})
    .sort({ total_rating_count: -1 })
    .limit(20);
  // const res = await Customer.find({}).sort({ name: 1 }).limit(1);

  try {
    res.status(200).json({
      game: trending,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error. Please try again.",
    });
  }
});

// returns all game names and genres
router.get("/names/", async (req, res) => {
  let allNames = await Videogame.find({}, "name genres cover")
    .sort({ name: 1 })
    .exec();
  // const res = await Customer.find({}).sort({ name: 1 }).limit(1);

  try {
    res.status(200).json({
      game: allNames,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error. Please try again.",
    });
  }
});

module.exports = router;
