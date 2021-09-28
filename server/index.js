const { db } = require('./db');
const app = require('./app');

const init = async() => {
  try{
    await db.sync();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
