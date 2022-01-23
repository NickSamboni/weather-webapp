/*
* mongodb local server config. 
* This is the file that manage the db connection and needs to be imported in the app.js
*
*/

const mongoose = require("mongoose");

//const MONGOURI = "mongodb://127.0.0.1:27017/weather_app_testing";
const MONGOURI = "mongodb+srv://masterpiece:fuckitshit@cluster0.v6lvd.mongodb.net/test";

const InitiateMongoServer = async () => { //usage of async func in order to be sure the db is ready to work. async goes with await
  try {
    await mongoose.connect(MONGOURI, { useNewUrlParser: true }); // await required by syntax 
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer; // export the module to be able to access it outside this path
