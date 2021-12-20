const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
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
})
module.exports = mongoose.model("data", DataSchema); 