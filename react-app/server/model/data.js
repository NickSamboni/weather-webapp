const mongoose = require("mongoose");
var Schema   = mongoose.Schema;

const objects = new Schema({
    //geometry: {type: String, coordinates: [Number, Number] },
    //geometry: {type: String, coordinates: [Number, Number]},
    elevation: {unitCode: String, value: Number},
    station: String,
    timeStamp: String,
    temperature: {unitCode: String, value: Number},
    windDirection: {unitCode: String, value: Number},
    windSpeed: {unitCode: String, value: Number},
    Pressure: {unitCode: String, value: Number},
    visibility: {unitCode: String, value: Number},
    maxTemp24h: {unitCode: String, value: Number},
    minTemp24h: {unitCode: String, value: Number},
    Humidity: {unitCode: String, value: Number}
},
{ typeKey: '$type' } //needed for moongose to not recon type as a special word but a normal string insted
)

//objects.index({geometry:'2dsphere'});

module.exports = mongoose.model("data", objects); 