const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  return db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.status(200).json(entries[0]);
    })
    .catch((err) => {
      res.status(400).json("unable to submit image");
    });
};

module.exports = {
  handleImage,
};
