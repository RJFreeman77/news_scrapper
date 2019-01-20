const router = require("express").Router();
const newsContr = require("../../controllers/newsController");

router.get("/scraper/", (req, res) => {
    newsContr.addNewArticles()
        // .then(data => {
        //     console.log(data)
        //     res.json(data)
        // });


});

module.exports = router;
