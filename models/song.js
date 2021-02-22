'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    song.belongsTo(models.album, {
      as: 'songs',
      foreignKey: 'album_id',
      onDelete: 'CASCADE'
    })
  };
    }

  song.init({
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    album_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'song',
  });
  return song;
};