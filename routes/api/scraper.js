const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const newsContr = require("../../controllers/newsController");
const Promise = require("bluebird");

router.get("/", (req, res) => {
    const url = "https://www.npr.org/sections/news/";
    const dbTasks = scrapeNews(url).then(articles => {
        // console.log("articles: ", articles);

        newsContr.upsertArticle(articles, (err, result) => {
            if (err) console.log(err);
            res.json(result);
        });


        // articles.map(art => newsContr.upsertArticle(art));
        // res.json(articles);
        // articles.map(article => newsContr.ensureUnique(article))
    });

    // const runTasks = Promise.all(dbTasks);
    // dbTasks.then(concreteArticles => res.json(concreteArticles));
});

function scrapeNews(url) {
    const scrapeTask = axios.get(url)
        .then(response => {
            return mapArticles(response);
        });
    return scrapeTask;
}

function mapArticles(response) {
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