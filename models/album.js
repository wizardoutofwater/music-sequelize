'use strict';
module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define('album', {
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    artist_id: DataTypes.INTEGER
  }, {});
  album.associate = function(models) {
    album.belongsTo(models.artist, {
        foreignKey: "artist_id",
        onDelete: 'CASCADE'
    });
    album.hasMany(models.song, {
      as: 'songs',
      foreignKey: 'album_id'
    });
  };
  // album.associate = function(models) {
  //   album.belongsTo(models.artist, {
  //     as: 'artist',
  //     foreignKey: 'album_id'
  //   })
  // };
  return album;
};