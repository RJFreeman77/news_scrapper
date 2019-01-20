const express = require("express");
const mongoose = require("mongoose");

const app = express();

const routes = require("./routes");
const PORT = process.env.PORT || 3001

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);

// connect to mongo database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScrape123";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));