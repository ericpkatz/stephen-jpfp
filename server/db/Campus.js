const db = require('./db');
const Sequelize = require('sequelize');
const { DataTypes, STRING, TEXT } = Sequelize;

const Campus = db.define('campus', {
  name: {
    type: STRING,
    allowNull: false,
    set: function(value){
      this.setDataValue('name', value.toUpperCase());
    },
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: STRING,
    allowNull: true,
    defaultValue: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
  },
  address: {
    type: STRING,
    allowNull: false,
    set: function(value){
      this.setDataValue('address', `${value}!`);
    },
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: TEXT
  }
});

module.exports = {
  Campus
}
