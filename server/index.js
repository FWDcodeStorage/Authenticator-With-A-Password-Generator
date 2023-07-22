const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user");

const app = express();

// env config
require('dotenv').config({path: './.env'})

//middlewares
//a build in middleware function in express, it parses icomin json requests and puts the parsed data in req.body

app.use(express.json());

//a node.js package for providing a connect/express middleware that can be used to enable cors with various options
//cross-origin resource sharing
app.use(cors());

// connect db to a localhost:27017 and premaid db
//it is always better practice to use path this way
mongoose.connect(process.env.MONGO_PORT);

//create a route
//register user
app.post("/register", async (req, res) => {
  const { name, email, password, file } = req.body;
  //check if name exists
  if (!name) {
    return res.json("Name is required");
  }
  //check if password exists and if password length is more than 6
  if (!password || password.length < 6) {
    return res.json("Password must be at least 6 characters");
  }

  try {
    // Check if email already exists
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Create the new user
    const newUser = await UserModel.create({ name, email, password, file });
    res.json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//login user
app.post("/login", (req, res) => {
  const { name, password } = req.body;

  UserModel.findOne({ name: name })
    .then((user) => {
      //check if the user already exists in out db
      if (user) {
        //password shoud be the same as password from db
        if (user.password === password) {
          res.json("success");
        } else {
          res.status(400).json({ error: "password incorrect" });
        }
      } else {
        res.status(404).json({ error: "no record existed" });
      }
    })
    .catch((err) => {
      console.error("Server error:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

//running server
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
