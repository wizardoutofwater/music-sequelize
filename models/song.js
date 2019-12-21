'use strict';
module.exports = (sequelize, DataTypes) => {
  const song = sequelize.define('song', {
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    album_id: DataTypes.INTEGER,
    year: DataTypes.INTEGER
  }, {});
  song.associate = function(models) {
    song.belongsTo(models.album, {
      as: 'album',
      foreignKey: 'album_id'
    });
  };
  return song;
};