require("dotenv").config();
const Clarifai = require("clarifai");

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY || "None",
});

const handleFaceDetection = () => (req, res) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json("Bad Request");
    return;
  }
  clarifaiApp.models
    .predict(Clarifai.FACE_DETECT_MODEL, url)
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(404).json("face not found");
    });
};

module.exports = {
  handleFaceDetection,
};
