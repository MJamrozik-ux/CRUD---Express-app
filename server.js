const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = require("./config/database.config.js");
app.listen(3000);
mongoose.connect(dbConfig.url)
  .then(function () {
    console.log("Database Connected Successfully!!");
  })
  .catch(function (err) {
    console.log("Could not connect to the database", err);
    process.exit();
  });

const User = require("./models/Users.js");
//CREATE
app.post("/users", async function (req, res) {
  try {
    const name = req.body.name;
    const age = req.body.age;

    const user = new User({
      name: name,
      age: age
    });

    const savedUser = await user.save();

    res.send(savedUser);

  } catch (err) {
    res.status(500).send({
      message: "Error creating user"
    });
  }
});