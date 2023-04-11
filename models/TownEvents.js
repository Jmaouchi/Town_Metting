const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')


class TownEvents extends Model{}

TownEvents.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventAdress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'townEvents'
  }
);


module.exports = TownEvents;