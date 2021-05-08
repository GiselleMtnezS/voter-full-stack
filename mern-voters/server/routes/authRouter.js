const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
//add new user 

authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (user) {
      res.status(403);
      return next(new Error("That username is taken"));
    }
    const newUser = new User(req.body);
    newUser.save((err, savedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET);
        return res.status(201).send({ token, user: savedUser.withoutPassword() });
    });
  });
});

//login
authRouter.post("/", (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!user) {
      console.log(req.body.username);
      res.status(403);
      return next(new Error("Username or Password are incorrect"));
    }
    //if (req.body.password !== user.password) {
    //  console.log(req.body.password);
    //  res.status(403);
    //  return next(new Error("Username or Password are incorrect"));
    //}

      user.checkPassword(req.body.password, (err, isMatch) => {
          if (err) {
        res.status(403);
        return next(new Error("Username or Password are incorrect"));
          }

          if (!isMatch) {
      res.status(403);
      return next(new Error("username or password are incorrect"));
          }

const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
    return res.status(200).send({ token, user: user.withoutPassword() });
      })  
  });
});

module.exports = authRouter;
