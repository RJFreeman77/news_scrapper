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
    addNewArticles: () => {
        // scrape articles and put results into array. 
        // then go through array and save each one into the db
        // then return them all as an array of json

        const scrapeTask = scraper.scrapeArticles()
            .then(res => {
                res.map(e => {
                    post(e);
                })
            });

        // ^doesn't work. saves to DB, but doesnt return anything. 

        const post = (task) => {
            return News.findOneAndUpdate(
                { url: task.url },
                task,
                { upsert: true, returnNewDocument: true },
                (err, doc) => {
                    if (err) {
                        console.error("findOneAndUpdate Error: ", err)
                    }
                    // articles.push(doc);
                    return doc;
                });
        }

        // const addIfUnique = News.findOneAndUpdate(
        //     { url: scrapeTask.url },
        //     scrapeTask,
        //     { upsert: true, returnNewDocument: true },
        //     (err, doc) => {
        //         if (err) {
        //             console.error("findOneAndUpdate Error: ", err)
        //         }
        //         return doc;
        //     });

        const getExisting = News.find();
        return scrapeTask;
        // return Promise.all([scrapeTask, addIfUnique]);
        // const promiseReturn = Promise.all([scrapeTask]).then(tasks => post(tasks));
    }

};

module.exports = controls;