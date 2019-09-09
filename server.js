const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const axios = require("axios");
const logger = require("morgan");
const cheerio = require("cheerio");

const db = require("./models");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

const app = express();

const PORT = 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect(MONGODB_URI)
// mongoose.connect("mongodb://localhost/spaceNews", { useNewUrlParser: true})
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");



app.get("/scrape", function(req, res) {
  axios.get("https://www.space.com/news").then(function(response) {
    // console.log(response.data)

    const $ = cheerio.load(response.data);
    // const title = $('.article-name')
    // console.log(title.text())
    $("div.listingResult").each(function(i, element) {
      let result = {};
        result.title = $(this)
        .children("a")
        .children("article")
        .children(".content")
        .children("header")
        .children("h3")
        .text();

      result.summary = $(this)
        .children("a")
        .children("article")
        .children(".content")
        .children(".synopsis")
        .text();

      result.url = $(this)
        .children(".article-link")
        .attr("href");
      
      // result.favorite = false;

      // console.log(result)
        if (result) {
          // console.log(result)
          db.Article.create(result)
          .then(function(scrapedArticle){
            console.log(scrapedArticle)
          })
        } 
       
    });

  
    res.send("Scrape Complete")
  
  });
});

//Html Routes

app.get("/articles", (req, res) => {
  db.Article.find({})
  .then(function(dbArticle){
      res.render("index", {
        Article: dbArticle
      })
    // res.json(dbArticle)
  })
  .catch((err) =>{
    res.json(err);
  });

})


app.get("/articles/:id", (req,res)=>{
  db.Article.findOne({ _id: req.params.id})
  .populate("note")
  .then((dbArticle)=> {
      res.json(dbArticle);
  })
  .catch((err)=>{
    res.json(err);
  })
})

app.post("/articles/:id", (req,res) =>{
  db.Note.create(req.body)
  .then(function(dbNote){


    return db.Article.findOneAndUpdate({ 
      _id: req.params.id
    }, 
    {
      note : dbNote._id
    },
    {
      new:true
    })
    .then((dbArticle) =>{
      res.json(dbArticle)
    })
        .catch((err)=>{
      res.json(err)
    
  });
});
})














app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
