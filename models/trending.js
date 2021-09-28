const mongoose = require("mongoose");
const { Schema } = mongoose;

const trendingSchema = new Schema({
  rank: { type: Number, required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Videogame" },
});

const Trending = mongoose.model("Trending", trendingSchema);

module.exports = Trending;
