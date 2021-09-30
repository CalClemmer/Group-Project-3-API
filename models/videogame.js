const mongoose = require("mongoose");
const { Schema } = mongoose;

const userReviewSchema = new Schema({
  userId: { type: String },
  userFirstName: { type: String },
  rating: { type: Number },
  reviewText: { type: String },
});

const videogameSchema = new Schema({
  id: { type: Number },
  cover: {
    id: { type: Number },
    url: { type: String },
  },
  genres: { type: Array },
  name: { type: String },
  rating: { type: Number },
  summary: { type: String },
  total_rating_count: { type: Number },
  videos: { type: Array },
  steamID: { type: Number },
  ignReview: { type: String },
  metacriticReview: { type: String },
  polygonReview: { type: String },
  googleReview: { type: String },
  steamReview: { type: Number },
  eurogamerReview: { type: String },
  gamespotReview: { type: String },
  userReviews: [userReviewSchema],
});

const Videogame = mongoose.model("Videogame", videogameSchema);

module.exports = Videogame;
