const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const newsContr = require("../../controllers/newsController");
const Promise = require("bluebird");

router.get("/", (req, res) => {
    const url = "https://www.npr.org/sections/news/"
    console.log(url);
    const dbTasks = scrapeNews(url).then(articles => {
        console.log("articles: ", articles);
        articles.map(article => newsContr.ensureUnique(article))
    });

    const runTasks = Promise.all(dbTasks);
    runTasks.then(concreteArticles => res.send(concreteArticles));
});

function scrapeNews(url) {
    console.log("scrapeNews()");
    const scrapeTask = axios.get(url)
        .then(response => {
            mapArticles(response)
        });
    return scrapeTask;
}

function mapArticles(response) {
    console.log("mapArticles");
    const $ = cheerio.load(response.data);
    const mapped = $(".item.has-image")
        .map(function () {
            return {
                title: $(this).find("h2.title").text(),
                img: $(this).find(".imagewrap").find("img").attr("src"),
                url: $(this).find(".imagewrap").find("a").attr("href"),
                summary: $(this).find("p.teaser").text()
            };
        });
    // console.log("mapped: ", mapped.toArray());
    return mapped.toArray();
}

module.exports = router;