const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/user");
const generator = require('generate-password')
const bcrypt = require('bcrypt'); // A library to help you hash passwords.

const app = express();

// env config
require('dotenv').config({path: './.env'})

//middlewares
//a build in middleware function in express, it parses incoming json requests and puts the parsed data in req.body

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
  console.log("Received data:", req.body);

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

// generate password and send it to the client side
app.post('/generatepassword', (req, res) => {
  // console.log(req.body) // the request is an object like this ({ includeNumbers: false, includeLetters: true, includeSymbols: false })
  
  const password = generator.generate({ // I used generate-password package to generate password
    length: 16, // you need to ender a length for the generated password
    numbers: req.body.includeNumbers && true, // if you need to include numbers, make this true
    symbols: req.body.includeSymbols && true // if you need to include symbols, make this true
  })
  res.send(password)
})

//running server
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});



// Bcrypt https://www.npmjs.com/package/bcrypt
/*

Bcrypt is a one-way hashing function designed to be computationally expensive, making it difficult and time-consuming to reverse the process. Unlike encryption, which is a reversible process, hashing is meant to be irreversible for security purposes. There is no direct way to "unhash" bcrypt hashes.

When you use bcrypt to hash a password, it generates a salt and combines it with the password to create a hashed representation. The salt is stored alongside the hash, and the bcrypt algorithm is designed in a way that it requires the original salt to verify a password.

When verifying a password, bcrypt rehashes the input password with the stored salt and compares the resulting hash with the stored hash. If they match, the password is considered valid.

So, if you need to check whether a given plaintext password matches a bcrypt hash stored in your system, you can use the bcrypt compare function to perform the verification.

*/