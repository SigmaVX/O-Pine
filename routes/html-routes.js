var mongoose = require("mongoose");
var db = require("../models");
// mongoose.connect("mongodb://localhost/opine");

module.exports = function(app) {

  // Index
  app.get("/", function (req, res) {
    
    var data={};

    res.render("index", data);
    
  //   db.News.find({})
  //     .then(function (data) {
  //       console.log(data);
  //       res.render("index", data);
  //     })
  //     .catch(function (err) {
  //       res.json(err);
  //     });
  });

  
}