const express = require("express");
const app = express();

app.get("/", (req, resp) => {
  resp.send("This is working");
});
app.listen(3000);
