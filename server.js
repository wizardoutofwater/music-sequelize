const express = require("express");
const app = express();
const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET All Artists
app.get("/artist", (req, res) => {
  db.artist.findAll().then((results) => {
    res.json(results); // this threw a rejection error when placed at the end.. why?
    results.forEach(function (index) {
      console.log(index.id, index.name);
    });
  });
});

// GET Specific Artist (artist/:id)
app.get("/artist/:id", (req, res) => {
  db.artist
    .findAll({ where: { id: parseInt(req.params.id) } })
    .then((artist) => {
      res.json(artist);
      artist.forEach(function (artist) {
        console.log(artist.id, artist.name);
      });
    });
});

// Add New Artist POST (/artist)
app.post("/artist", (req, res) => {
  if (!req.body.name) {
    console.log(req.body);
    res.send("please provide Artist Name");
    return;
  }
  db.artist
    .create({
      name: req.body.name,
    })
    .then((artist) => {
      console.log(`Artist Created with ID # ${artist.id}`); // Need to make this line more like line 12
      res.send(artist);
    });
});

// Update Artist Info
app.put("/artist/:id", (req, res) => {
  db.artist.findByPk(req.params.id).then(function(artist) {
    artist
      .update({
        name: req.body.name,
      })
      .then((artist) => {
        res.send(artist);
      });
  });
});

// -------CODE BELOW DIDNT FULLY WORK, WHY?---------
//   db.artist
//     .update({ name: req.body.name }, { where: { id: req.params.id } })
//     .then(function (artist) {
//       console.log(`Updated Artist with ID# ${artist.id}`);
//       console.log(artist);
//       res.send(artist); // why is this outputting ' [1] ', but still successfully updating the db?
//     });
// });

// Add code to get all albums. GET /album
app.get("/album", (req, res) => {
  db.album.findAll().then((results) => {
    res.send(results); // this threw a rejection error when placed at the end.. why?
    results.forEach(function (index) {
      console.log(index.id, index.name);
    });
  });
});

// Add code to get a specific albums. GET /album/:id

// Add code to create an album. POST /album

// Add Code to get all songs from an album. GET /album/song SELECT * FROM songs WHERE album_id = ($1)

// Add code to create a song for an album. POST /album/song
app.post("/album/:id", (req, res) => {
  if (!req.body.name) {
    console.log(req.body);
    res.send("please provide Song Name");
    return;
  }
  db.song
    .create({
      name: req.body.name,
      duration: req.body.duration,
      album_id: req.body.album_id, // need to add in foreign key association here probably
    })
    .then((song) => {
      console.log(`song Created with ID # ${song.id}`);
      res.send(song);
    });
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
