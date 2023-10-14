require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require("./views/routes/loginRoutes");

const app = express();
const port = process.env.PORT;
app.use(express.static("public"));
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("landingPage.ejs");
});

app.use(userRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected");
    app.listen(port, () => console.log(`Server running at ${port}`));
  })
  .catch((error) => {
    console.log(error);
  });
