const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')


class Families extends Model{}

Families.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // code: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    familyName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'families'
  }
);


module.exports = Families;