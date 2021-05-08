const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/comment");
emptyhandling = (found, res) => {
  !found.length //is 2 equal signs in purpose
    ? res.status(204).send()
    : res.status(200).send(found);
};

//get comments
commentRouter.get("/", (req, res, next) => {
  Comment.find((err, comments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return emptyhandling(comments, res);
  });
});

//add New Comment
commentRouter.post("/:issueID/", (req, res, next) => {
  console.log(req.params);
  req.body.userID = req.user._id;
  req.body.issueID = req.params.issueID;
  console.log(req.body);
  req.body.date = new Date();
  const newComment = new Comment(req.body);
  newComment.save((err, savedComment) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedComment);
  });
});

//Get Comments by Issue
commentRouter.get("/issue/:issueID", (req, res, next) => {
  Comment.find({ issueID: req.params.issueID }, (err, comments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return emptyhandling(comments, res);
  });
});

//Get Comments by User
commentRouter.get("/user/", (req, res, next) => {
  Comment.find({ userID: req.user._id }, (err, comments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return emptyhandling(comments, res);
  });
});

//Get Comment by ID
commentRouter.get("/:commentID", (req, res, next) => {
  Comment.find({ _id: req.params.commentID }, (err, comments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return emptyhandling(comments, res);
  });
});

//update comment info
commentRouter.put("/:commentID", (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.commentID },
    req.body,
    { new: true },
    (err, updatedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      } else {
        return res.status(201).send(updatedComment);
      }
    }
  );
});

commentRouter.delete("/:commentID", (req, res, next) => {
  Comment.findOneAndDelete(
    { _id: req.params.commentID },
    (err, deletedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      } else {
        return res
          .status(200)
          .send(`Successfully Deleted Comment: ${deletedComment}`);
      }
    }
  );
});

module.exports = commentRouter;
