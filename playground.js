require("dotenv").config();
const { Videogame } = require("./models");
const axios = require("axios");

const videogameDatajson = require("./models/api_data/videogameData.json");
const appIDsteamjson = require("./models/api_data/appIDsteam.json");
const appIdArr = appIDsteamjson["applist"]["apps"];
const ignDatajson = require("./models/api_data/ignData.json");

// inserts videogame data into mongodb
// Videogame.insertMany(videoGameDatajson, function (err, result) {
//   if (err) {
//     // handle error
//   } else {
//     // handle success
//     console.log("Happy Days, inserted a lot of things");
//   }
// });

// the dream: fetch all reviews using google search api
// first step: make an API call to the appropriate game and get back the data
// second step: comb through the data and find the review scores

async function googleReviewAPI(name) {
  // replace any white space with +'s so it doesn't break
  let _name = name.replace(/\s/g, "+");
  _name = name.replace(/'/, "");
  console.log(_name);
  var axios = require("axios");

  var config = {
    method: "get",
    url: `https://google-search3.p.rapidapi.com/api/v1/search/q=${_name}+game+review&num=30`,
    headers: {
      "x-user-agent": "desktop",
      "x-rapidapi-host": "google-search3.p.rapidapi.com",
      "x-rapidapi-key": "8801cb144amsh0d4384d2a8fc1e2p19634cjsn7b74bd3bbcb4",
    },
  };

  try {
    const response = await axios(config);
    let responseData = JSON.stringify(response.data.results);
    return responseData;
  } catch (error) {
    console.log(error);
  }
}

async function findAndUpdateReviewScores(arr, gameName) {
  try {
    arr = JSON.parse(arr);
  } catch {
    console.log("You broke Json!");
  }
  if (arr) {
    for (i = 0; i < arr.length; i++) {
      if (arr[i]["g_review_stars"]) {
        //yes, this is wet code. But it works. Will clean if I have time.
        try {
          if (arr[i]["cite"]["domain"].includes("polygon.com")) {
            let review = arr[i]["g_review_stars"];
            let _review = review.match(/:\s([\s\S]*)\s·/);
            let polygonReview = _review[1];
            updatePolygonReview(gameName, polygonReview);
          }
          if (arr[i]["cite"]["domain"].includes("ign.com")) {
            let review = arr[i]["g_review_stars"];
            let _review = review.match(/:\s([\s\S]*)\s·/);
            let ignReview = _review[1];
            updateIGNReview(gameName, ignReview);
          }
          //  strange issues coming from eurogamer
          //  honestly easier to just disable it for now rather than deal
          //  with their inconsistent returns
          //   if (arr[i]["cite"]["domain"].includes("eurogamer.net")) {
          //     let review = arr[i]["g_review_stars"];
          //     let _review = review.match(/Rating:\s([\s\S]*)\s·/);
          //     console.log("_review", _review);
          //     let eurogamerReview = _review[1];
          //     console.log("Eurogamer", eurogamerReview);
          //   }
          if (arr[i]["cite"]["domain"].includes("metacritic.com")) {
            let review = arr[i]["g_review_stars"];
            let _review = review.match(/:\s([\s\S]*)\s·/);
            let metacriticReview = _review[1];
            updateMetacriticReview(gameName, metacriticReview);
            console.log(gameName);
          }
          if (arr[i]["cite"]["domain"].includes("gamespot.com")) {
            let review = arr[i]["g_review_stars"];
            let _review = review.match(/:\s([\s\S]*)\s·/);
            let gameSpotReview = _review[1];
            updateGameSpotReview(gameName, gameSpotReview);
          }
        } catch {
          console.log(gameName);
        }
      }
    }
  }
}

// i hate that I couldn't figure out how to combine these functions
// was faster to do it this way than figure out how to make it clean

async function updatePolygonReview(gameName, reviewScore) {
  let filter = { name: gameName };
  let update = { polygonReview: reviewScore };
  try {
    await Videogame.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log(error);
  }
}

async function updateIGNReview(gameName, reviewScore) {
  let filter = { name: gameName };
  let update = { ignReview: reviewScore };
  try {
    await Videogame.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log(error);
  }
}

async function updateGameSpotReview(gameName, reviewScore) {
  let filter = { name: gameName };
  let update = { gamespotReview: reviewScore };
  try {
    await Videogame.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log("We broke it!", error);
  }
}

async function updateMetacriticReview(gameName, reviewScore) {
  let filter = { name: gameName };
  let update = { metacriticReview: reviewScore };
  try {
    await Videogame.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log(error);
  }
}

//return value of getGoogleReview can only be read in an async function

async function oneGameAllScores(gameName) {
  data = await googleReviewAPI(gameName);
  findAndUpdateReviewScores(data, gameName);
}

async function addAllReviews() {
  for (let i = 1550; i < videogameDatajson.length; i++) {
    let name = videogameDatajson[i]["name"];
    setTimeout(function () {
      console.log(i);
      oneGameAllScores(name);
    }, 500 * (i - 1550));
  }

  console.log("We done!!!!");
}

addAllReviews();

// oneGameAllScores("Cities: Skylines");

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

function ignAddScores() {
  for (let i = 0; i < ignDatajson.length; i++) {
    let name = ignDatajson[i]["Game"];
    console.log(name);
    let score = ignDatajson[i]["Score"];
    console.log(score);
    updateOneIgnScore(name, score);
  }
  console.log("Finished adding IGN Scores :D");
}

// ignAddScores();

async function updateOneIgnScore(name, ignScore) {
  let filter = { name: name };
  let update = { ignReview: ignScore };
  try {
    await Videogame.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log(error);
  }
}

// Takes about 30 seconds to run
// addSteamIDs();

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
