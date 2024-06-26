const express = require("express");
const dotenv = require("dotenv");
const photoRouter = require("./routers/photos");
const categoriesRouter = require("./routers/categories");

dotenv.config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const app = express();

app.use(express.json());

// Rotte
app.use("/photos", photoRouter);
app.use("/categories", categoriesRouter);

app.listen(port, () => {
  console.log(`Server attivo su ${HOST}:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
