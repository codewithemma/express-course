const express = require("express");
const app = express();

const people = require("./routes/people");

// static assets
app.use(express.static("./methods-public"));

// parse form data
app.use(express.urlencoded({ extended: false }));

//parse json
app.use(express.json());

app.use("/api/people", people);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
