const express = require("express");
const router = express.Router();

const { Review } = require("../models"); // import stuff

// return All reviews
router.get("/test/", async (req, res) => {
  try {
    res.status(200).json({
      reviews: "Review Test Pass",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error. Please try again.",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let allReviews = await Review.find({}).limit(500);

    res.status(200).json({
      reviews: allReviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error. Please try again.",
    });
  }
});

module.exports = router;

router.get("/index/:idx", async (req, res) => {
  let review = await Review.find({ gameId: req.params.idx });
  try {
    res.status(200).json({
      review: review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error. Please try again.",
    });
  }
});

router.post("/new", function (req, res) {
  try {
    // Review.create({
    //   userId: "33",
    //   userName: "taco taco",
    //   text: "I like turtles",
    // });
    res.status(200).json({
      request: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error. Please try again.",
    });
  }
});
