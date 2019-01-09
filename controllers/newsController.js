const News = require("../models/index");
const Promise = require("bluebird");

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
    ensureUnique: result => {
        const myOperationResult = new Promise((resolve, reject) => {
            News
                .countDocuments({ title: result.title }, (err, count) => {
                    if (count === 0) {
                        News.create(result)
                            .then(res => resolve(res))
                        // .catch(err => console.log("error: ", err));

                    } else {
                        console.log("this article already exists");
                    }
                });
        });

        return myOperationResult;
    },
    upsertArticle: async (articles, cb) => {
        function runUpdate(obj) {
            return new Promise((resolve, reject) => {
                News.findOneAndUpdate(
                    { url: obj.url },
                    obj,
                    { upsert: true })
                    .then(result => resolve(result))
                    .catch(err => reject(err))
            });
        }

        let promiseArr = [];
        articles.forEach(obj => promiseArr.push(runUpdate(obj)));

        Promise.all(promiseArr).then(res => console.log(res));


        let error = "";
        const docs = [];
        // cb(error, docs);

        // articles.forEach((article) => {
        // News.findOneAndUpdate(
        //     { url: article.url },
        //     article,
        //     { upsert: true },
        //     (err, doc) => {
        //         if (err) { error = err };

        //         docs.push(doc);
        //         console.log(`Docs Length: ${docs.length}`)
        //     }
        // )
        // });

        // console.log(`Doc Count: #${docs.length}`)

    }

};

module.exports = controls;