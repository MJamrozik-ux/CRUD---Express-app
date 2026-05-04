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
//READ
app.get("/users", async function (req, res) {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving users"
    });
  }
});
//UPDATE
app.put("/users/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const updatedUser = await User.findByIdAndUpdate(id, {
      name: name,
      age: age
    }, { new: true });
    res.send(updatedUser);
  } catch (err) {
    res.status(500).send({
      message: "Error updating user"
    });
  }
}); 
//DELETE
app.delete("/users/:id", async function (req, res) {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.send({
      message: "User deleted successfully"
    });
  } catch (err) {
    res.status(500).send({
      message: "Error deleting user"
    });
  }
}); 