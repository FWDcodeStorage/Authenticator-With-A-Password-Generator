const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/user");
const generator = require('generate-password')
const bcrypt = require('bcrypt'); // A library to help you hash passwords.

const app = express();

// env config
require('dotenv').config({path: './config/.env'})

//middlewares
//a build in middleware function in express, it parses incoming json requests and puts the parsed data in req.body

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
        //password should be the same as password from db
        // if (user.password === password) {
        //   res.json("success");
        // } else {
        //   res.status(400).json({ error: "password incorrect" });
        // }
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => { // scroll down to fully understand this function, the user.password, the hashed password from the database, it compares it with the req.password
          if (err) {
            // Handle error
            console.log(err)
          } else if (isMatch) {
            res.json("success");
          } else {
            res.status(400).json({ error: "password incorrect" });
          }
        })
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