const express = require("express");
const cors = require("cors");
const knex = require("knex");

const signIn = require("./controllers/signIn");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const imageUrl = require("./controllers/imageUrl");

require("dotenv").config();

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "girish",
    password: process.env.DB_PASSWORD || "Hello",
    database: "smart-brain",
  },
});

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// API endpoints
app.post("/signin", signIn.handleSignIn(db));
app.post("/register", register.handleRegister(db));
app.get("/profile/:id", profile.handleProfile(db));
app.put("/image", image.handleImage(db));
app.post("/imageUrl", imageUrl.handleFaceDetection());

app.listen(5000, () => {
  console.log("App is running on http://localhost:5000/");
});
