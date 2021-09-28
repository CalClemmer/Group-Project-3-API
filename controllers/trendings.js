const express = require("express");
const router = express.Router();

const { Trending } = require("../models"); // import stuff

router.get("/", async (req, res) => {
  try {
    let allTrending = await Trending.find({});

    res.status(200).json({
      trending: allTrending,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error. Please try again.",
    });
  }
});

module.exports = router;
