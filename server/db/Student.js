const db = require('./db');
const Sequelize = require('sequelize');
const { DataTypes, STRING, DECIMAL, INTEGER } = Sequelize;

const Student = db.define('student', {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  gpa: {
    type: DECIMAL(2, 1),
    validate: {
      gpaValidator(value){
        if (value < 0 || value > 4.0) {
          throw new Error(`${value} is an invalid GPA value; GPA value must be between 0.0 and 4.0`)
        }
      }
    }
  },
  imageUrl: {
    type: STRING,
    allowNull: true,
    defaultValue: 'https://cdn4.iconfinder.com/data/icons/political-elections/50/48-1024.png'
  },
  enrollmentId: {
    type: STRING,
    allowNull: true
  }
});

module.exports = {
  Student
}