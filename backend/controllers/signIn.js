const bcrypt = require("bcrypt-nodejs");
const handleSignIn = (db) => (req, res) => {
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
};

module.exports = {
  handleSignIn,
};
