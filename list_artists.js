const models = require('./models');

// models.artist.findAll({ attributes: ['name'], include: ['albums']}).then(function (artists) {
//   artists.forEach(element => {
//     console.log(element.name);
//     console.log(element.albums);
//   });
// });

models.song.findAll({ attributes: ['name', 'duration', 'year'], include: ['album']}).then(function (songs) {
  songs.forEach(element => {
    console.log(element.name);
    console.log(element.album);
  });
});
