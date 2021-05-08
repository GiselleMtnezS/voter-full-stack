const bcrypt = require("bcrypt");

function UserObject(name, username, birthdate, password) {
  // console.log(
  //   bcrypt.hash(this.password, 10, (err, hash) => {
  //     if (err) return next(err);

  //     this.password = hash;
  //     console.log("hash", hash);
  //     console.log("user at hash function", user);
  //     return hash;
  //   })
  // );

  // console.log("password", password);
  (this.name = name),
    (this.username = username),
    (this.birthdate = birthdate),
    (this.password = password);
  // console.log("this.password", this.password);
}

//pre-save hook to encrypt password
// UserObject.pre("save", function (next) {
//   const user = this;
//   if (!user.isModified("password")) return next();
//     next();
//   });
// });
//method to check password validation

// UserObject.checkPassword = function (passwordAttempt, callback) {
//   console.log("passwordAttempt", passwordAttempt);
//   console.log("this.password", this.password);

//   bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
//     if (err) return callback(err);
//     // console.log("comparison", passwordAttempt === this.password);
//     // if (passwordAttempt === this.password) {
//     //   isMatch = true;
//     // }
//     return callback(null, isMatch);
//   });
// };

// //removing password from front-end
// UserObject.withoutPassword = function () {
//   const user = this;
//   // delete user.password;
//   // delete user.withoutPassword,
//   // delete user.checkPassword,
//   delete user.username;
//   return user;
// };

module.exports = UserObject;
