const express = require("express");
const connection = require("./config/mongo.js")

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// routes
app.use(require("./routes/api.js"));

connection.then(() => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
});