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

// app.post("/signin", (req, res) => {
//   const { email, password } = req.body;
//   db("login")
//     .select("*")
//     .where("email", "=", email)
//     .then((user) => {
//       if (user[0].hash === password) {
//         res.json(user[0]);
//       } else {
//         res.status(404).json("password is incorrect");
//       }
//     })
//     .catch((err) => {
//       res.status(404).json(`user not found for email=${email}`);
//     });
// });

app.post("/register", (req, res) => {
  let { name, email, password } = req.body;
  return db("users")
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
      res.status(400).json("user with same email exist " + err);
    });
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  return db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      user.length ? res.json(user[0]) : res.status(404).json("Not found");
    });
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  return db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.status(200).json(entries[0]);
    })
    .catch((err) => {
      res.status(400).json("unable to submit image", err);
    });
});

app.listen(5000, () => {
  console.log("App is running on http://localhost:5000/");
});
