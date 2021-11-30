// for starters;
// 1. Get the location of ALL the stations in Florida
// 2. Get the information about those id

// base url https://api.weather.gov/stations/
// url per stations /<station id>/observations/latest
const express = require("express");
const router = express.Router();

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

const BaseURL = 'http://api.weather.gov/stations/SURF1/observations/latest'
//const stationid = 'SURF1'
//const queryURL = `${BaseURL}/observations/latest`

class requestController {
    //manager of the forbidden access to the API - CORS
    /*addCorsHeader(){ 
        $.ajaxPrefilter(options => {
            if(options.crossDomain && $.support.cors) {
                options.url = 'https://the-ultimate-api-challenge.herokuapp.com/' + options.url;
            }
        });
    }*/
    getLocation() {
        //this.addCorsHeader()
        $.getJSON(BaseURL).done(data => console.log(data))
    }
}


router.get("/", (req, res) => {
  
  const request = new requestController()
  res.json(request.getLocation());
});

module.exports = router;