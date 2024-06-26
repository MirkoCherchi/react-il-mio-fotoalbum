const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler.js");
const notFound = require("./middlewares/notFound.js");
const photoRouter = require("./routers/photos");
const categoriesRouter = require("./routers/categories");
const authRouter = require("./routers/auth.js");

dotenv.config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const app = express();

// Middleware
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

// Rotte
app.use("/auth", authRouter);
app.use("/photos", photoRouter);
app.use("/categories", categoriesRouter);

// Middleware per gestire errori 404
app.use(notFound);

// Middleware per gestire altri errori
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server attivo su ${HOST}:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
