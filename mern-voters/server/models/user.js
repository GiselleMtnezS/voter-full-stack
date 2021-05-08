const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
//never give up the password.
const userSchema = new Schema({
  Name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  birthdate: { type: Number, required: false },
  issues: { type: Array, default: [] },
  //birthdate, limit realistically.
  //hashed password SALT
  //username
});

//pre-save hook to encrypt password
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

//method to check password validation
userSchema.methods.checkPassword = function (passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};

//removing password from front-end
userSchema.methods.withoutPassword = function () {
  const user = this.toObject();
  delete user.password;
  delete user.username;
  return user;
};

module.exports = mongoose.model("User", userSchema);
