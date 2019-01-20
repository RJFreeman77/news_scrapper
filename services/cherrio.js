const axios = require("axios");
const cheerio = require("cheerio");
const Promise = require("bluebird");

class Article {
    constructor(title, img, url, summary) {
        this.title = title;
        this.img = img;
        this.url = url;
        this.summary = summary;
    }
}

module.exports = function () {
    this.url = 'https://www.npr.org/sections/news/';

    this.scrapeArticles = () => {
        return axios.get(this.url)
            .then(res => cheerio.load(res.data))
            .then(this.mapAllArticles);
    }

    this.mapAllArticles = ($) => {
        const $container = $(".item.has-image");
        return $container.map((i, el) => this.mapArticle($(el))).get();
    }

    this.mapArticle = ($el) => {
        const newArt = new Article(
            $el.find("h2.title").text(),
            $el.find(".imagewrap").find("img").attr("src"),
            $el.find(".imagewrap").find("a").attr("href"),
            $el.find("p.teaser").text()
        );
        return newArt;
    }
}
