const News = require("../models/index");
const ArticleScraper = require('../services/cherrio');
// const Promise = require("bluebird");

const scraper = new ArticleScraper();

const controls = {
    create: (req, res) => {
        News
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findAll: (req, res) => {
        News
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getAll: (filter = {}) => {
        return News
            .find(filter, (err, docs) => {
                if (err) { throw (err); }
                console.log(docs);
                return docs;
            })
            .sort({ date: -1 });
    },
    addOrUpdateScraped: (task) => {
        return News.findOneAndUpdate(
            { url: task.url },
            task,
            { upsert: true, returnNewDocument: true },
            (err, doc) => {
                if (err) {
                    console.error("findOneAndUpdate Error: ", err)
                }
                return doc;
            });
    },
    addNewArticles: () => {
        const scrapeTask = scraper.scrapeArticles()
            .then(articles => {
                const articleTasks = articles.map(article => controls.addOrUpdateScraped(article));
                return Promise.all(articleTasks);

            })
        return scrapeTask;
    }

};

module.exports = controls;