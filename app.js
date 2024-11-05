const express = require("express");
const app = express();
let { people } = require("./data");

// static assets
app.use(express.static("./methods-public"));

// parse form data
app.use(express.urlencoded({ extended: false }));

//parse json
app.use(express.json());

app.get("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(201).json({ success: false, message: "please provide a name" });
  }
  res.status(201).json({ success: true, person: people });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("please provide credentials");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
