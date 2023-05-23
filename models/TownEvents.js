const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const zlib = require('zlib');


class TownEvents extends Model{}

TownEvents.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
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
    description: {
      type: DataTypes.STRING,
      // run this before it goes to the database
      set(value){
        // base64 is to turn binary data to strings
        const compressed = zlib.deflateSync(value).toString('base64');
        this.setDataValue('description', compressed);
      },
      get(){
        const value = this.getDataValue('description');
        // we need to uncompress the value to display it for the user ( this is almost the same as hashing but this is to gain some space with large data)
        const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64')); // transform the data to a base64 again
        return uncompressed.toString();
      }
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