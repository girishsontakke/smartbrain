const bcrypt = require("bcrypt-nodejs");
const handleRegister = (db) => (req, res) => {
  let { name, email, password } = req.body;
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
};

module.exports = {
  handleRegister,
};
