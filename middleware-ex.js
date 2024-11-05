const express = require("express");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");
const morgan = require("morgan");

// req => middleware => res
// app.use([logger, authorize]);

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/about", (req, res) => {
  res.send("about page");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
