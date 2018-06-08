// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var moment = require("moment");

// Express App & Parser Setup
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Setup Handlebars View Engine
// =============================================================
app.engine("handlebars", exphbs({
    "defaultLayout": "main",
    "helpers": {
      // Formates timestamp into DD, MM NN, YYYY  HH:MM format
      "fmtDate": (date) => moment(date).format("LLLL")
    }
  }));

app.set("view engine", "handlebars");


// Link Database & Static Directory
// =============================================================
var db = require("./models");
app.use(express.static("public"));

// Mongo Location
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/opine";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/news-api-routes.js")(app);


// Start Express
// =============================================================
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});