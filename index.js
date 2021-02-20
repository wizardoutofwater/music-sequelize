const express = require("express");
const app = express();
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/artist", function (req, response) {
  // add code to get all artists
});

app.get("/artist/:id", function (req, response) {
  // add code to get specific artist
});

app.put("/artist/:id", function (req, response) {
  // add code to modify an specific artist
});

app.post("/artist", function (req, response) {
  console.log('creating artist');
  // add code to create artist
});

// Add code to get all albums. GET /album

// Add code to get a specific albums. GET /album/:id

// Add code to create an album. POST /album

// Add Code to get all songs from an album. GET /album/song

// Add code to create a song for an album. POST /album/song

app.listen(3000, function(){
  console.log('server listening on port 3000');
})