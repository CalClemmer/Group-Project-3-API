const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  text: { type: String, required: true },
  gameId: { type: Number },
  date: { type: Date, default: new Date() },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
