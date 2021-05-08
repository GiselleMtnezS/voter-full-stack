const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
//get all users
userRouter.get("/issues", (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return user.length //to wrap into function
      ? res.status(404).send("Nothing found in the records")
      : res.status(200).send(users);
  });
});
//getOne user by userID
userRouter.get("/users/:userID/issues/:issueID", (req, res, next) => {
  User.find({ _id: req.params.userID }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    } else {
      return user.length //to wrap into function
        ? res.status(404).send("Nothing found in the records")
        : res.status(200).send(user);
    }
  });
});

//add new user DIRECTLY
userRouter.post("/", (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save((err, savedUser) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedUser);
  });
});

//add new user from /users
userRouter.post("/users", (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save((err, savedUser) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedUser);
  });
});

//update user info
userRouter.put("/users/:userID", (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.userID },
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      } else {
        return res.status(201).send(updatedUser);
      }
    }
  );
});

userRouter.delete("/users/:userID", (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.userID }, (err, deletedUser) => {
    if (err) {
      res.status(500);
      return next(err);
    } else {
      return res.status(200).send(`Successfully Deleted User: ${deletedUser}`);
    }
  });
});

module.exports = userRouter;
