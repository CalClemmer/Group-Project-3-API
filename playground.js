require("dotenv").config();
const { Videogame } = require("./models");
const axios = require("axios");

const videogameDatajson = require("./models/api_data/videogameData.json");
const appIDsteamjson = require("./models/api_data/appIDsteam.json");

// inserts videogame data into mongodb
// Videogame.insertMany(videoGameDatajson, function (err, result) {
//   if (err) {
//     // handle error
//   } else {
//     // handle success
//     console.log("Happy Days, inserted a lot of things");
//   }
// });

console.log("Console log", appIDsteamjson["applist"]["apps"].length);
const appIdArr = appIDsteamjson["applist"]["apps"];

// console.log(appIdArr[0]["appid"]); // 5

// returns
// [
//   { appid: 5, name: 'Dedicated Server' },
//   { appid: 7, name: 'Steam Client' },
//   { appid: 8, name: 'winui2' },
//   ...
// ]

async function getStoreData(id) {
  var data = "";
  var config = {
    method: "get",
    url: `http://store.steampowered.com/appreviews/${id}?json=1&num_per_page=0`,
    headers: {},
    data: data,
  };
  let ratio;

  try {
    const response = await axios(config);
    let totalReviews = JSON.stringify(
      response.data.query_summary.total_reviews
    );
    let positiveReviews = JSON.stringify(
      response.data.query_summary.total_positive
    );
    let percent = positiveReviews / totalReviews;
    ratio = Math.round(percent * 1000) / 10;

    return ratio;
  } catch (error) {
    console.log(error);
  }
  // try {
  //   let ratio;
  //   axios(config).then(function (response) {
  //     let totalReviews = JSON.stringify(
  //       response.data.query_summary.total_reviews
  //     );
  //     let positiveReviews = JSON.stringify(
  //       response.data.query_summary.total_positive
  //     );
  //     let percent = positiveReviews / totalReviews;
  //     ratio = Math.round(percent * 1000) / 10;
  //     console.log("ratio", ratio);
  //   });

  //   return 2;
  // } catch (error) {
  //   console.log(error);
  // }

  //   .catch(function (error) {
  //     console.log(error, "It no work");
  //   });
}

async function addSteamReviews() {
  for (let i = 0; i < videogameDatajson.length; i++) {
    let name = videogameDatajson[i]["name"];
    let gameData = await Videogame.find({ name: name });
    let steamID = gameData[0]["steamID"];
    if (steamID) {
      let steamReview = await getStoreData(steamID);
      if (steamReview) {
        updateSteamReview(steamID, steamReview);
        console.log("steamID", steamID);
      }
    }
  }
  console.log("We done!!!!");
}

// addSteamReviews();
// adds all steam reviews to games; takes a minute, super satisfying

function addSteamIDs() {
  for (let i = 0; i < appIdArr.length; i++) {
    let name = appIdArr[i]["name"];
    let steamId = appIdArr[i]["appid"];
    updateOneNameId(name, steamId);
  }
}

// Takes about 30 seconds to run
// addSteamIDs();

// this works, now I need to try to automate it
async function updateOneNameId(name, steamID) {
  let filter = { name: name };
  let update = { steamID: steamID };
  try {
    await Videogame.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log(error);
  }
}

async function updateSteamReview(steamID, steamReview) {
  let filter = { steamID: steamID };
  let update = { steamReview: steamReview };
  try {
    await Videogame.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log(error);
  }
}

async function viewAllGames() {
  try {
    let allGames = await Videogame.find({});
    console.log(allGames, "You did say ALL games...");
  } catch (error) {
    console.log(error);
  }
}

async function viewTop(n) {
  let trending = await Videogame.find({})
    .sort({ total_rating_count: -1 })
    .limit(n);
  // const res = await Customer.find({}).sort({ name: 1 }).limit(1);

  try {
    console.log(trending);
  } catch (error) {
    console.log(error);
  }
}

async function viewHundreds() {
  try {
    let allGames = await Videogame.find({ steamReview: 100 });
    console.log(allGames, "100? Really? Hm...");
  } catch (error) {
    console.log(error);
  }
}

// viewHundreds();

// updateOne();

// viewTop(30);

// viewAllGames();
