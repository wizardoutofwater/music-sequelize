const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./models");
const chalk = require("chalk");

const error = chalk.bold.red;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // why use true or false here?
app.use(morgan("tiny"));

// GET All Artists
app.get("/artist", (req, res) => {
  db.artist.findAll().then((results) => {
    res.send(results); // this threw a rejection error when placed at the end.. why?
    results.forEach(function (index) {
      console.log(
        chalk.keyword("orange")(chalk.magenta.bold(index.id), index.name)
      );
    });
  });
});

// GET Specific Artist (artist/:id)
app.get("/artist/:id", (req, res) => {
  db.artist
    .findAll({ where: { id: parseInt(req.params.id) } })
    .then((artist) => {
      if (artist !== undefined && artist.length != 0) {  // <--- Make this Error Handler more like my forum errors 
        res.send(artist);
        artist.forEach(function (artist) {
          console.log(
            chalk.keyword("orange")(chalk.magenta.bold(artist.id), artist.name)
          );
        });
      } else {
        res.status(404).send("No Artist Found with ID: " + req.params.id);
      }
    });
});

// Add New Artist POST (/artist)
app.post("/artist", (req, res) => {
  if (!req.body.name) {
    console.log(req.body);
    res.status(400).send("Please provide Artist Name");
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
  db.artist.findByPk(req.params.id).then(function (artist) {
    artist
      .update({
        name: req.body.name,
      })
      .then((artist) => {
        console.log(
          chalk.keyword("orange")(chalk.magenta.bold(artist.id), artist.name)
        );
        res.send(artist);
      });
  });
});

// -------CODE BELOW DIDNT FULLY WORK, WHY?--------- why use a where when you can findByPk?
// db.artist
//   .update({ name: req.body.name }, { where: { id: req.params.id } })
//   .then(function (results) {
//     console.log(`Updated Artist with ID# ${req.params.id}`);
//     res.send(results);
//    results.forEach((updatedArtist) =>{
//      console.log(updatedArtist) // why is this outputting ' [1] ', but still successfully updating the db?

//    });
//   });
// });

// GET all albums. GET /album
app.get("/album", (req, res) => {
  db.album.findAll().then((results) => {
    res.send(results); // this threw a rejection error when placed at the end.. why?
    results.forEach(function (index) {
      console.log(index.id, index.name);
    });
  });
});

// GET Specific ALbum /album/:id
app.get("/album/:id", (req, res) => {
  db.album.findByPk(req.params.id).then((album) => {
    res.send(album);
    // (function (album) {
    //   console.log(album.id, album.name);
    // });
  });
});

// Create album POST /album
app.post("/album", (req, res) => {
  if (!req.body.name) {
    console.log(req.body);
    res.send("please provide Album Name");
    return;
  }
  db.album
    .create({
      name: req.body.name,
      year: req.body.year,
      artist_id: req.body.artist_id,
    })
    .then((album) => {
      console.log(`Album Created with ID # ${album.id}`); // Need to make this line more like line 12
      res.send(album);
    });
});

//  get all songs from an album. GET /album/song SELECT * FROM songs WHERE album_id = ($1)
app.get("/album/:id/songs", (req, res) => {
  db.song
    .findAll({ where: { album_id: parseInt(req.params.id) } })
    .then((songs) => {
      res.json(songs);
      songs.forEach(function (song) {
        console.log(song.id, song.name);
      });
    });
});
//  create a song for an album. POST /album/song
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

// get all albums with artist attached
app.get("/albums/artists", (req, res) => {
  db.album
    .findAll({
      include: "artist", //[{model: artist}]  <--why didnt that work? its how its done in L.P
    })
    .then((results) => {
      res.send(results);
    });
});

//--------- MORE ROUTES + QUERY IDEAS --------

// Get all Albums by a specific Artist by ID

// Get all Albums by a specific Artist by Name

// Get All songs by Specific Artist, sorted by album

// get all albums released in a specific year GET /albums/YEAR=:year <-- is this how you would do that? how best to implement?

// get all songs released in a specific year (through the album release year)

// Update Album Info PUT (/album/:id)

// Update Song Info PUT (/song/:id)

// -------------**************----------------

// ------------ADD ERROR HANDLER MIDDLEWARE BELOW----------

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

app.listen(3000, function () {
  console.log(
    chalk.cyanBright("server listening on port " + chalk.bold.bgMagenta("3000"))
  );
});
