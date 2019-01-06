const db = require("../models");

module.exports = {
    create: (req, res) => {
        db.News
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findAll: (req, res) => {
        db.News
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    ensureUnique: title => {
        db.News
            .countDocuments({ title }, (err, count) => {
                const exists = (count === 0) ? true : false;
                return exists;
            });
    }
};
