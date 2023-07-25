const mongoose = require("mongoose");
const bcrypt = require('bcrypt'); // A library to help you hash passwords.

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  file: String,
});

// Password hash middleware. // this make it that when you register, it hashes your password, the password in the database will look like this '"$2b$10$ZbeF/qwHe.KFesF.HiWHn.ODQToQ1Z3zl4ZlP/RtGA24QcpWo/xky'
 
UserSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
