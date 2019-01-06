const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    titie: { type: String, required: true },
    summary: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comments: [{
        user: String,
        comment: String,
        date: { type: String, default: Date.now }
    }]
});

const News = mongoose.model("News", newsSchema);

module.exports = News;