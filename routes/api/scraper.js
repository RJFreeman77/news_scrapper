const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const newsContr = require("../../controllers/newsController");

router.get("/", (req, res) => {
    console.log("inside scraper.js");
    const url = "https://www.npr.org/sections/news/"
    axios.get(url)
        .then(response => {
            const $ = cheerio.load(response.data);
            
            const articleContainer$ = $(".item.has-image");
            articleContainer$.each((index, el) => {
                const result = {};
                const el$ = $(el);

                result.title = el$.find("h2.title").text();
                result.img = el$.find(".imagewrap").find("img").attr("src");
                result.url = el$.find(".imagewrap").find("a").attr("href");
                result.summary = el$.find("p.teaser").text();

                newsContr.ensureUnique(result);
            });
        });
});

module.exports = router;