const express = require("express");
const bcrypt = require("bcrypt-nodejs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

app.get("/", (req, resp) => {
  resp.json(database.users);
});

app.post("/signin", (req, res) => {
  req.body.name === database.users[0].name &&
  req.body.password === database.users[0].password
    ? res.json("success")
    : res.status(400).json("failed");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, null, null, (err, hash) => {
    database.users.push({
      id: "124",
      name: name,
      email: email,
      password: hash,
      entries: 0,
      joined: new Date(),
    });
  });
  res.json(database.users[database.users.length - 1]);
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

app.post("/image", (req, res) => {
  const { id } = req.body;
  database.users.forEach((user) => {
    if (user.id === id) {
      user.entries++;
      return res.json(user.entries);
    }
  });
  res.status(400).json("user not found");
});

app.listen(3000, () => {
  console.log("App is running on http://localhost:3000/");
});
