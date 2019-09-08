var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
 
  title: {
    type: String,
    // required: true
  },
  
  url: {
    type: String,
    // required: true
  },
  
  summary: {
    type: String,
   
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
