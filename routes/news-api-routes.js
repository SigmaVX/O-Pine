
var mongoose = require("mongoose");
var db = require("../models/news.js");
mongoose.connect("mongodb://localhost/opine");

module.exports = function(app) {

  // Get News Stories
  app.get("/scan", function (req, res) {
   
    var cheerio = require("cheerio");
    var request = require("request");
    
    // Call To Grab HTML Body
    request("https://esportsobserver.com/", function(error, response, html) {
    
      // Load the HTML Into Cheerio Using $ Syntax
      var $ = cheerio.load(html);
    
      $(".single-post").each(function(i, element) {
    
        var url = $(element).find("a").attr("href");
        var title = $(element).find("a").attr("title");
        var image = $(element).find("img").attr("src");
        var date = $(element).find("time.entry-date").text();
    
        // Save Results In Array - Not Used BC Using Mongoose
        // var results = [];        
        // results.push({
        //   title: title,
        //   url: url,
        //   image: image,
        //   source: "TEO",
        //   date: date
        // });

        // Save Data Into An Object
        var newsItem = {
          title: title,
          url: url,
          image: image,
          source: "TEO",
          date: date
        };
      
        // console.log(newsItem);
      // Add the text and href of every link, and save them as properties of the result object
      // result.title = $(this)
      //   .children("a")
      //   .text();
      // result.link = $(this)
      //   .children("a")
      //   .attr("href");

        // Create Record Using Model And News Object
        db.News.create(newsItem)
        .then(function(data) {
          console.log(data);
          res.send("done");
        })
        .catch(function(err) {
          return res.json(err);
        });
      });      
      // res.send("done"); 
    });
  });
}