const News = require("../models/index");

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
    }
};

module.exports = controls;