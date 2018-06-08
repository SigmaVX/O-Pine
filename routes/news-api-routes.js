
var mongoose = require("mongoose");
var db = require("../models");
// mongoose.connect("mongodb://localhost/opine");

module.exports = function(app) {

  // Grab News From TEO
  function grabTEO() {

    var cheerio = require("cheerio");
    var request = require("request");
    
    // Call To Grab HTML Body
    request("https://esportsobserver.com/", function(error, response, html) {
    
      // Load the HTML Into Cheerio Using $ Syntax
      var $ = cheerio.load(html);
    
      $(".single-post").each(function(i, element) {
    
        var url = $(element).find("a").attr("href");
        var title = $(element).find("h3 a").text();
        var image = $(element).find("a img").attr("src");
        var date = $(element).find("time.entry-date").attr("datetime");
    
        if(i < 20){
          
          // Save Data Into An Object
          var newsItem = {
            title: title,
            url: url,
            image: image,
            source: "TEO",
            date: date
          };
      
          // Create Record Using Model And News Object
          db.News.create(newsItem)
          .then(function(data) {
            console.log(data);
          })
          .catch(function(err) {
            console.log(err);
          });
        };
      });
    });
  }

  // Grab News From Kotaku
  function grabKotaku(){

    var cheerio = require("cheerio");
    var request = require("request");

    // Call To Grab HTML Body
    request("https://kotaku.com/tag/esports", function(error, response, html) {

      // Load the HTML Into Cheerio Using $ Syntax
      var $ = cheerio.load(html);
    
      $("article").each(function(i, element) {
    
        var url = $(element).find("a").attr("href");
        var title = $(element).find("h1 a").text();
        var image = $(element).find("source").attr("data-srcset");
        var date = $(element).find("time.meta__time").attr("datetime");
    
        if(i < 20){
          
          // Save Data Into An Object
          var newsItem = {
            title: title,
            url: url,
            image: image,
            source: "Kotaku",
            date: date
          };
      
          // Create Record Using Model And News Object
          db.News.create(newsItem)
          .then(function(data) {
            console.log(data);
          })
          .catch(function(err) {
            console.log(err);
          });
        };
      });
    });
  };


  // Route - Get News Stories
  app.get("/api/scan", function (req, res) {
    
    function clearDB(){
    // Clear the Database Table
    db.News.collection.deleteMany({});
    }

    async function render(){
      // await clearDB();
      await grabTEO();
      await grabKotaku();

      db.News.find({}, function (err, data) {
        if(err) throw err;
        console.log("======Data======\n",data,"\n======End======");
        console.log("Data Sync Complete");
        // Save Data Array As An Object 
        var dataOut = { data: data };
        // Render The Index With Data
        res.render("index", dataOut);
      });
    };
    render();
});


// Route - Get Comments
app.get("/api/comments/:id", function (req, res) {
  var id = req.params.id;
  console.log("ID Selected For Comments: ", id);
  db.News.findById(id, 'title comments', function(err, data){
    if(err) throw err;
    console.log("Sendind Data: ", data);
    res.JSON(data);
  });
});




};  
