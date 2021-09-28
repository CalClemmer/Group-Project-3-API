const express = require("express");
const router = express.Router();

const { Videogame } = require("../models"); // import stuff

// find all games
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

// find top n games
router.get("/trending/:n", async (req, res) => {
  let n = req.params.n;

  let trending = await Videogame.find({})
    .sort({ total_rating_count: -1 })
    .limit(n);
  // const res = await Customer.find({}).sort({ name: 1 }).limit(1);

  try {
    res.status(200).json({
      game: trending,
      why: n,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error. Please try again.",
    });
  }
});

// Dinosaur index for reference
// router.get('/:idx', function(req, res) {
//   // get dinosaurs
//   let creatures = fs.readFileSync('./models/prehistoric_creatures.json');
//   let creatureData = JSON.parse(creatures);

//   //get array index from url parameter
//   let creaturesIndex = parseInt(req.params.idx);

//   //render page with data of the specified animal
//   res.render('prehistoric_creatures/show', {myCreature: creatureData[creaturesIndex]});
// });

module.exports = router;
