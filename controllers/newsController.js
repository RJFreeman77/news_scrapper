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
        News
            .countDocuments({ title: result.title }, function (err, count) {
                const resultArr = [];
                if (count === 0) {
                    News.create(result)
                        .then(res => resultArr.push(res))
                        .catch(err => console.log("error: ", err));
                } else {
                    console.log("this article already exists");
                }
                // Promise.all(resultArr).then();
            });
    }
};

module.exports = controls;