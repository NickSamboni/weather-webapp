/*
* This controls the rout to be accessed by any user when visiting the page
*/

const express = require("express");
const router = express.Router();

router.get('/', function(req, res) { 
  res.render('home'); // view name to be displayed
});

router.get('/index.ejs', function(req, res) { 
  res.render('index'); // view name to be displayed
});

router.get('/signup.ejs', function(req, res) { 
  res.render('signup'); // view name to be displayed
});






module.exports = router; // export the module to be able to access it outside this path
