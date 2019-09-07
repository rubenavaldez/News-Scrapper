const express = require("express");
const handlebars = require("express-handlebars")
const mongoose = require("mongoose");
const axios = require("axios");
const logger = require("morgan")
const cheerio = require("cheerio");
// let result = {};
// var db = require("./models")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

const app = express();

const PORT = 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));

app.get("/scrape", function(req, res){
    axios.get("https://www.space.com/news").then(function(response){
    // console.log(response.data)
    
    const $ = cheerio.load(response.data);
    // const title = $('.article-name')
    // console.log(title.text())
    $("div.listingResult").each(function(i,element){
        let result = {};
        result.title = $(this)
        .children("a")
        .children('article')
        .children('.content')
        .children('header')
        .children('h3')
        .text()

        result.summary = $(this)
        .children("a")
        .children('article')
        .children('.content')
        .children('.synopsis')
        .text()


        
        console.log(result)
        
    })
    
    // $(".article-name").each(function(i,element){
    //     let result = {};
    //     result.title = $(this)
    //     // .children("h3")
    //     .text()
        
    //     console.log(result)
        
    // })

    




    });
});
















app.listen(PORT, () => {
    console.log("App is running on port " + PORT );
})