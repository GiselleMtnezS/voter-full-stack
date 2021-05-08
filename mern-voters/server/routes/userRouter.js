const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

emptyhandling = (found, res) => {
  !found.length //is 2 equal signs in purpose
    ? res.status(204).send()
    : res.status(200).send(found);
};

//get all users
userRouter.get("/", (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return emptyhandling(users, res);
  });
});
//getOne user
userRouter.get("/profile", (req, res, next) => {
  User.find({ _id: req.user._id }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    } else {
      return emptyhandling(user, res);
    }
  });
});

//update user info
userRouter.put("/profile", (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
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

userRouter.delete("/profile", (req, res, next) => {
  User.findOneAndDelete({ _id: req.user._id }, (err, deletedUser) => {
    if (err) {
      res.status(500);
      return next(err);
    } else {
      return res.status(200).send(`Successfully Deleted User: ${deletedUser}`);
    }
  });
});

module.exports = userRouter;
