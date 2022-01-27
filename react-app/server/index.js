const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const api = require("./routes/api");
const cors = require("cors");
const mongoose = require("mongoose");
var router = express.Router();

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
app.use('/api', api);

app.get("/", (req, res) => {
  res.json({ message: "Server Working" });
    
});


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});


module.exports = app;


/*
axios.get('https://api.weather.gov/stations?state=MT').then(
       (Response)=>{
        for (const y in Response.data.features){
          const stations_id = Response.data.features[y].id;
          const stations = stations_id.substring(33,40);
          const last_obs_stat = latest_obs1+stations+latest_obs2;
          
        axios.get(last_obs_stat).then(
           (Response)=>{
              if (Response.status === 200){
                axios.get(last_obs_stat).then( function(Response){onSuccess(Response)} )
                .catch( function(error){ console.log(error) });
              }else{;}
            }).catch( err => {console.log(err)});
          }
        }).catch( err => {console.log(err)});  

function onSuccess(Response){
                    
  var props = Response.data.properties;
  var coords = Response.data.geometry;

  var geometry = coords;
  var timeStamp = props.timestamp;
  var temperature = props.temperature;
  var windDirection = props.windDirection;
  var windSpeed = props.windSpeed;
  var Pressure = props.barometricPressure;
  var visibility = props.visibility;
  var maxTemp24h = props.maxTemperatureLast24Hours;
  var minTemp24h = props.minTemperatureLast24Hours;
  var Humidity = props.relativeHumidity;
  var station = props.station;
  var elevation = props.elevation;

  assignDataValue(geometry,timeStamp,temperature,windSpeed,windDirection,
    Pressure,visibility,maxTemp24h,minTemp24h,Humidity,station,elevation)
}

function assignDataValue(geometry,timeStamp,temperature,windSpeed,windDirection,
  Pressure,visibility,maxTemp24h,minTemp24h,Humidity,station,elevation){

    var pushData = new Data();
    pushData.geometry = geometry;
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
  }*/

