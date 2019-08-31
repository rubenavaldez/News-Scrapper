const express = require("express");
const handlebars = require("express-handlebars")
const mongoose = require("mongoose");
const axios = require("axios");
const logger = require("morgan")

// var db = require("./models")

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

var app = express();

var PORT = 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));

app.get("/scrape", function(req, res){
    axios.get("https://www.space.com/news").then(function(response){
    console.log(response.data)
    // var $ = cheerio.load(response.data);

    // $("article-name").each(function(i,element){
    //     var result = {};
    //     result.title = $(this)
    //     .children("a")
    //     .text();
    //     result.link = $(this)
    //     .children("a")
    //     .attr("href");

    // })

    // console.log(response.data)




    });
});
















app.listen(PORT, () => {
    console.log("App is running on port " + PORT );
})