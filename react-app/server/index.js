const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const cors = require("cors");

const axios = require('axios');
const Data = require("./model/data");

const InitiateMongoServer = require("./config/db");
const { Script } = require("vm");

//init the MONGODB connection
InitiateMongoServer();

const app = express();
app.use(cors());

// PORT
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', user);

app.get("/", (req, res) => {
  res.json({ message: "Server Working" });
  axios.get('https://api.weather.gov/stations/SURF1/observations/latest').then(
    function(Response){
      onSuccess(Response)
    }).catch(function(error){
      console.log(error)
    });
  
    function onSuccess(Response){
    var json = Response.data.properties;
    console.log(json);
    var timeStamp = json.timestamp;
    var temperature = json.temperature;
    var windDirection = json.windDirection;
    var windSpeed = json.windSpeed;
    var Pressure = json.barometricPressure;
    var visibility = json.visibility;
    var maxTemp24h = json.maxTemperatureLast24Hours;
    var minTemp24h = json.minTemperatureLast24Hours;
    var Humidity = json.relativeHumidity;
    var station = json.station;
    var elevation = json.elevation;

    assignDataValue(timeStamp,temperature,windSpeed,windDirection,
      Pressure,visibility,maxTemp24h,minTemp24h,Humidity,station,elevation)
  }

  function assignDataValue(timeStamp,temperature,windSpeed,windDirection,
    Pressure,visibility,maxTemp24h,minTemp24h,Humidity,station,elevation){
      var pushData = new Data()
      pushData.timeStamp = timeStamp;
      pushData.temperature = temperature;
      pushData.windSpeed = windSpeed;
      pushData.windDirection = windDirection;
      pushData.Pressure = Pressure;
      pushData.visibility = visibility;
      pushData.maxTemp24h = maxTemp24h;
      pushData.minTemp24h = minTemp24h;
      pushData.Humidity = Humidity;
      pushData.station = station;
      pushData.elevation = elevation;

      pushData.save();
    }
});

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});


module.exports = app;