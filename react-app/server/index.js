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


const states = [ "AL", "AK", "AS"];

const cors_domain = 'https://the-ultimate-api-challenge.herokuapp.com';
const baseIPA = 'https://api.weather.gov/stations?state=';
//const request_url = `${cors_domain}/${baseIPA}`;
const latest_obs1 = 'https://api.weather.gov/stations/';
const latest_obs2 = '/observations/latest';

app.get("/", (req, res) => {
  res.json({ message: "Server Working" });

  for (const x in states){
    axios.get(`${baseIPA}`+states[x]).then(
      (Response)=>{
        console.log(`${baseIPA}`+states[x]);
        for (const y in Response.data.features){
          const stations_id = Response.data.features[y].id;
          const stations = stations_id.substring(33,40);
          const latest = stations;
          const last_obs_stat = latest_obs1+latest+latest_obs2;
          
          axios.get((`${last_obs_stat}`)).then(
            (Response)=>{
              if (Response.status === 200){

                axios.get(last_obs_stat).then(
                  function(Response){ onSuccess(Response) }).catch(function(error){ console.log(error) });
                
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
                    }

              }else{;}
              setTimeout(() => { }, 3000)
            }).catch( err => {
              //console.clear(err);
            });
          }
      }
    ).catch( err => {
      //console.error(err);
    });
  } 

  /*axios.get('https://api.weather.gov/stations/K79J/observations/latest').then(
    function(Response){ onSuccess(Response) }).catch(function(error){ console.log(error) });
  
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
 
});

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});


module.exports = app;