const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/user");

const app = express();

// env config
require("dotenv").config({ path: "./.env" });

//middlewares
//a build in middleware function in express, it parses icomin json requests and puts the parsed data in req.body

app.use(express.json());

//a node.js package for providing a connect/express middleware that can be used to enable cors with various options
//cross-origin resource sharing
app.use(cors());

// connect db to a localhost:27017 and premaid db
//it is always better practice to use path this way
mongoose.connect(process.env.MONGO_PORT);

// make a function to create a token
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

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

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = await UserModel.create({
      name,
      email,
      password: hash,
      file,
    });

    //create a token
    const token = createToken(newUser._id);

    res.status(200).json({ newUser, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//login user
//I change this to async function because of bcrypt...it returns a promise
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        //create a token
        const token = createToken(user._id);

        res.status(200).json({ user, token });
      } else {
        res.status(400).json({ error: "password incorrect" });
      }
    } else {
      res.status(404).json({ error: "no record existed" });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//running server
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
