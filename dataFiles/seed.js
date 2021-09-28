const studentData = require('./studentData');
const campusData = require('./campusData');

const { db, Student, Campus } = require('../server/db/');

const syncAndSeed = async() => {
  await console.log('Trying to Seed...');

  await db.sync({ force: true });

  // const [amy, joe] = await Promise.all(studentData.map( student => Student.create( student ) ))
  // const [houston, denver] = await Promise.all(campusData.map( campus => Campus.create( campus ) ));

  // await Promise.all([
  //   amy.setCampus(denver),
  //   joe.setCampus(houston)
  // ]);

  const campuses = await Promise.all(campusData.map( campus => Campus.create( campus ) ));
  const randomCampusIdx = () => Math.floor(Math.random() * campuses.length)
  // await Promise.all(studentData.map( student => Student.create({ ...student, campusId: campuses.find( campus => campus.id === student.enrollmentId ).id }) ));

  await Promise.all(studentData.map( student => Student.create({ ...student, campusId: campuses[randomCampusIdx()].id})));



  console.log(`
  
    Seeding succesful!

  `)
  db.close()
};

syncAndSeed().catch(error => {
  db.close()
  console.log(`
    Error Seeding:
    ${error.message}
    ${error.stack}
  `)
})