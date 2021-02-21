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
app.post('/artist', (req, res) => {
   if(!req.body.name){
    console.log(req.body);
    res.send('please provide Artist Name');
    return;
  }
  db.artist.create({
    name: req.body.name
  }).then((artist) => {
      console.log(`Artist Created with ID # ${artist.id}`); // Need to make this line more like line 12
      res.send(artist);
  });
})

app.put("/artist/:id", (req, res) => {
  // add code to modify an specific artist
  db.artist.update({
    name: req.body.name
  },
  { where: { id: parseInt(req.params.id) } 
}).then((updatedArtist) => {

    console.log (updatedArtist);
    res.send(updatedArtist);
});
  
});

// Add code to get all albums. GET /album

// Add code to get a specific albums. GET /album/:id

// Add code to create an album. POST /album

// Add Code to get all songs from an album. GET /album/song

// Add code to create a song for an album. POST /album/song

app.listen(3000, function () {
  console.log("server listening on port 3000");
});
