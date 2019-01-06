const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const newsContr = require("../../controllers/newsController");

const tempArticleArr = [];

router.get("/scrape", (req, res) => {
    axios.get("https://www.reuters.com/news/world")
        .then(response => {
            const $ = cheerio.load(response.data);
            const result = {};

            const articleContainer$ = $(".FeedItem_item");
            articleContainer$.each(el => {
                const el$ = $(el);

                result.title = el$.find(".FeedItemHeadline_headline").text();
                result.summary = el$.find(".FeedItemLede_lede").text();
                result.url = el$.find(".FeedItemHeadline_headline").find("a").attr("href");
                result.category = el$.find(".FeedItemMeta_channel").text();

                if (newsContr.ensureUnique(result.title)) {
                    newsContr.create(result);
                } else {
                    console.log("this article already exists");
                }
            });
        });
});

module.exports = router;