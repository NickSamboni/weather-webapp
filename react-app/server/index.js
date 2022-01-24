const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const cors = require("cors");

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
});

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

module.exports = app;