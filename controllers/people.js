let { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, person: people });
};

const createPerson = (req, res) => {
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
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === parseInt(id));
  if (!person) {
    res
      .status(404)
      .json({ success: false, message: `no person with id ${id}` });
  }
  const newPeople = people.filter((person) => person.id !== parseInt(id));
  res.status(200).json({ success: true, data: newPeople });
};

module.exports = { getPeople, createPerson, updatePerson, deletePerson };
