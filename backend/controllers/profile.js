const handleProfile = (db) => (req, res) => {
  const { id } = req.params;
  return db
    .select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      user.length ? res.json(user[0]) : res.status(404).json("Not found");
    });
};

module.exports = {
  handleProfile,
};
