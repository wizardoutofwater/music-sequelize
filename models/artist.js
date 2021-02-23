'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      artist.hasMany(models.album, {
          as: 'albums',
          foreignKey: 'artist_id',
          onDelete: 'CASCADE'
      });
  };
};
  artist.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'artist',
  });
  return artist;
};