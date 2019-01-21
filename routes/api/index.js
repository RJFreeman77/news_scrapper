const router = require("express").Router();
const newsContr = require("../../controllers/newsController");

router.get("/scraper/", (req, res) => {
    newsContr.addNewArticles()
        .then((_) => newsContr.getAll())
        .then(data => res.json(data))


});


module.exports = router;
