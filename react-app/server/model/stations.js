/*
* Stations schema, this file needs to be modified when needed for interacting with the station data
* when inputed on the web
*
*/

const mongoose = require("mongoose");
const {Schema} = mongoose;

const StationSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Elevation:Number,
    geometry: {
        coordinates: [Number, Number],
    },
    humidity: Number,
    maxTemp24h: Number,
    minTemp24h:Number,
    seaLevelPressure:Number,
    timestamp:String,
    visibility: Number,
    windDirection: Number,
    windSpeed: Number
});
  
// export model user with UserSchema
module.exports = mongoose.model("StationsData", StationSchema); // export the module to be able to access it outside this path

