const express = require("express");
const app = express();
let { people } = require("./data");

// static assets
app.use(express.static("./methods-public"));

// parse form data
app.use(express.urlencoded({ extended: false }));

//parse json
app.use(express.json());

app.get("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(201).json({ success: false, message: "please provide a name" });
  }
  res.status(201).json({ success: true, person: people });
});

app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(201).json({ success: false, message: "please provide a name" });
  }
  res.status(201).json({
    success: true,
    data: [
      ...people,
      {
        id: 6,
        name,
      },
    ],
  });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("please provide credentials");
});

app.put("/api/postman/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = people.find((person) => person.id === parseInt(id));
  if (!person) {
    res
      .status(404)
      .json({ success: false, message: `no person with id ${id}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === parseInt(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
});

app.delete("/api/postman/people/:id", (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === parseInt(id));
  if (!person) {
    res
      .status(404)
      .json({ success: false, message: `no person with id ${id}` });
  }
  const newPeople = people.filter((person) => person.id !== parseInt(id));
  res.status(200).json({ success: true, data: newPeople });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
