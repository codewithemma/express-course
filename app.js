const express = require("express");
const app = express();

// req => middleware => res

const logger = (req, res) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  next();
  console.log(method, url, time);
};

app.get("/", logger, (req, res) => {
  res.send("home page");
});

app.get("/about", (req, res) => {
  res.send("about page");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
