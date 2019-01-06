const router = require("express").Router();
const scraper = require("./scraper");

// Book routes
router.use("/scraper", scraper);

module.exports = router;
