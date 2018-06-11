var mongoose = require("mongoose");
var News = require("../models/News.js");
// mongoose.connect("mongodb://localhost/opine");

module.exports = function(app) {

  // Route - Load Index
  app.get("/", function (req, res) {

    // Null Implies to Return All Fields
    News.find({}, null, {sort:{date:-1}}, function (err, data) {
      if(err) throw err;
      // console.log("======Data======\n",data,"\n======End======");
  
      // Save Data Array As An Object 
      var dataOut = { data: data };

      // Render The Index With Data
      res.render("index", dataOut);
    });
  });
}