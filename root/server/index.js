const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const home = require("./routes/home");

var path = require('path');

const InitiateMongoServer = require("./config/db");

//init the MONGODB connection
InitiateMongoServer();

const app = express();

//Constructor for the css files to work
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// PORT
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', home);
app.use('/user', user);


/* app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});
*/
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

module.exports = app;