const db = require('./db');
const { Student } = require('./Student');
const { Campus } = require('./Campus');

Campus.hasMany(Student);
Student.belongsTo(Campus);

module.exports = {
  db,
  Student,
  Campus
}