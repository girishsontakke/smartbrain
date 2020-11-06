const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

require("dotenv").config();

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "girish",
    password: process.env.DB_PASSWORD,
    database: "smart-brain",
  },
});

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "girish",
      email: "girish@gmail.com",
      password: "secret",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "john",
      email: "john@gmail.com",
      password: "secret",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.post("/signin", (req, res) => {
  req.body.email === database.users[0].email &&
  req.body.password === database.users[0].password
    ? res.json(database.users[0])
    : res.status(400).json("failed");
});

app.post("/register", (req, res) => {
  let { name, email, password } = req.body;
  db("users")
    .returning("*")
    .insert({
      name: name,
      email: email,
      joined: new Date(),
    })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => {
      res.status(400).json("user with same email exist");
    });
  // bcrypt.hash(password, null, null, (err, hash) => {
  //   database.users.push({
  //     id: "124",
  //     name: name,
  //     email: email,
  //     password: hash,
  //     entries: 0,
  //     joined: new Date(),
  //   });
  //   res.json(database.users[database.users.length - 1]);
  // });
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  database.users.forEach((user) => {
    if (user.id === id) {
      return res.json(user);
    }
  });
  res.json("not found");
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  database.users.forEach((user) => {
    if (user.id == id) {
      user.entries++;
      return res.json(user.entries);
    }
  });
  res.status(400).json("user not found");
});

app.listen(5000, () => {
  console.log("App is running on http://localhost:5000/");
});
