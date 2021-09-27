require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// import models

// routes & controllers
// const customers = require("./controllers/customers");
const videogames = require("./controllers/videogames");

app.get("/", (req, res) => {
  res.json({
    name: "Videogame API",
    message: "Game On",
  });
});

// app.use("/customers", customers);
app.use("/videogames", videogames);

// Another way to do the exact same thing
// app.use("/customers", require("./controllers/customers"));

const PORT = process.env.PORT || 8000;

// listen to port
app.listen(PORT, () => console.log(`Listening on PORT`, PORT));
