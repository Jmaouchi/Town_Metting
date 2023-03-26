const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')


class Member extends Model{}

Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    family_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'families',
        key: 'id'
      },
      // this should be here, and if we delete a family, then all its memeber should be deleted 
      onDelete: 'CASCADE'
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'member'
  }
);


module.exports = Member;