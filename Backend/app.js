const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const app = express();

app.listen(port, () => {
  console.log(`Server attivo su ${HOST}:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
