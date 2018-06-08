var mongoose = require("mongoose");

// Schema Constructor
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: "Headline Is Required"
  },
  image: {
    type: String,
    trim: true,
    default: "./images/esport.png"
    // validate: [
    //   function(input) {
    //     return input.length >= 6;
    //   },
    //   "Image Link Should Be Longer."
    // ]
  },
  url: {
    type: String,
    trim: true,
    required: "URL Is Required"
  },
  date: {
    type: Date,
    required: "URL Is Required"
  },
  source: {
    type:String,
    trim: true,
    required: "Source Is Required"
  },
  comments: {
    type: Array
  }
});

// Creates The From The Above Schema With Mongoose's Model Method
var News = mongoose.model("News", NewsSchema);

// Export the Model
module.exports = News;