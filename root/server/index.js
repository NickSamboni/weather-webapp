const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const home = require("./routes/index");
var path = require('path');

const InitiateMongoServer = require("./config/db");

//init the MONGODB connection
InitiateMongoServer();

const app = express();

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