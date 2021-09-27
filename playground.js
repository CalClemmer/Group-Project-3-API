require("dotenv").config();
const { Videogame } = require("./models");

var json = "./models/api_data/videogameData.json";

// Videogame.insertMany(json, function (err, result) {
//   if (err) {
//     // handle error
//   } else {
//     // handle success
//     console.log("Happy Days, inserted a lot of things");
//   }
// });

(async function viewAllGames() {
  try {
    let allGames = await Videogame.find({});
    console.log(allGames, "You did say ALL games...");
  } catch (error) {
    console.log(error);
  }
})();

// (async function makeNewProduct() {
//   let newProduct = await Product.create({
//     name: "Play Doh",
//     price: "6",
//     companyName: "D'oh",
//     ratings: "42",
//     condition: "slighty chewed",
//     description: "Eat the Play Doh.",
//   });
//   console.log(newProduct);
// })();

// name: { type: String, required: true },
// genre: { type: String },
// imageURL: { type: String },
// desc: { type: String },
