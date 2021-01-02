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

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("Bad Request");
    return;
  }
  db.select("*")
    .from("login")
    .where({ email })
    .then((data) => {
      if (bcrypt.compareSync(password, data[0].hash)) {
        return db
          .select("*")
          .from("users")
          .where({ email: data[0].email })
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => {
            res.status(400).json("Invalid credentials");
          });
      } else {
        res.status(400).json("Invalid Credentials");
      }
    })
    .catch((err) => {
      res.status(404).json("User not found");
    });
});

app.post("/register", async (req, res) => {
  let { name, email, password } = await req.body;
  if (!email || !password || !name) {
    res.status(400).json("Bad Request");
    return;
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    return trx
      .insert({
        email: email,
        hash: hash,
      })
      .into("login")
      .returning("email")
      .then((signUpEmail) => {
        return trx
          .returning("*")
          .insert({
            name: name,
            email: signUpEmail[0],
            joined: new Date(),
          })
          .into("users")
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("user with same email exist " + err));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  return db
    .select("*")
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
