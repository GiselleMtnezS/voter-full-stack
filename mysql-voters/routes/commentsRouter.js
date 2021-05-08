const express = require("express");
const commentRouter = express.Router();
const CommentObject = require("../models/comment");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "774107",
  database: "votesdb",
});

emptyhandling = (found, res) => {
  !found.length //is 2 equal signs in purpose
    ? res.status(204).send()
    : res.status(200).send(found);
};

//get comments
commentRouter.get("/", (req, res, next) => {
  let sql = `SELECT * FROM comments`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("all comments");
    emptyhandling(result, res);
  });
});

//add New Comment
commentRouter.post("/:issueID/", (req, res, next) => {
  console.log(req.params);
  //req.body.userID = req.user._id;
  req.body.userID = req.user._id;
  req.body.issueID = req.params.issueID;
  let date = new Date();
  req.body.date = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  let newComment = new CommentObject(
    req.body.text,
    req.body.date,
    req.body.issueID,
    req.body.userID
  );
  console.log(newComment);
  let sql = `INSERT INTO comments (text, date, issueID, userID) VALUES ('${req.body.text}','${req.body.date}','${req.body.issueID}', '${req.body.userID}' );`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    return res.status(201).send(newComment);
  });
});
//Get Comments by Issue
commentRouter.get("/issue/:issueID", (req, res, next) => {
  let sql = `SELECT * FROM comments WHERE issueid = '${req.params.issueID}'`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("comments by issue");
    emptyhandling(result, res);
  });
});

//Get Comments by User
commentRouter.get("/user/", (req, res, next) => {
  let sql = `SELECT * FROM comments WHERE userid = '${req.user._id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("comments by user");
    emptyhandling(result, res);
  });
});

//Get Comment by ID
commentRouter.get("/:commentID", (req, res, next) => {
  let sql = `SELECT * FROM comments WHERE _id = ${req.params.commentID}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("single comment by id");
    emptyhandling(result, res);
  });
});

//update comment info
commentRouter.put("/:commentID", (req, res, next) => {
  console.log(req.params);
  //req.body.userID = req.user._id;
  //req.body.userID = req.params.userID;
  //req.body.issueID = req.params.issueID;
  //let date = new Date()
  //req.body.date = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
  //let newComment = new CommentObject(req.body.text, req.body.date, req.body.issueID, req.body.userID)
  //console.log(newComment)
  console.log(req.body);
  let sql = `UPDATE comments SET text = '${req.body.text}' WHERE _id = ${req.params.commentID};`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.dir(result);
    return result;
  }); //making the update changes
  let getSql = `SELECT * FROM comments WHERE _id = ${req.params.commentID}`;
  db.query(getSql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("single comment edited");
    emptyhandling(result, res);
  }); //returning specific object with all its information including updates.
});
let deletedIndexes = [];
commentRouter.delete("/:commentID", (req, res, next) => {
  //// keeping track of commentids deleted, deleting only If it has not been deleted before (if the comment id entered is not in the deleted records table.)
  var message = "nothing deleted yet";
  let getRecordSql = `SELECT commentID FROM DeletedRecords`;
  db.query(getRecordSql, (err, result) => {
    if (err) {
      throw err;
    }

    for (let i = 0; i < result.length; i++) {
      deletedIndexes.push(result[i].commentID);
    }
    console.log(
      "result line 130",
      deletedIndexes.findIndex((comment) => {
        return comment === `${req.params.commentID}`;
      })
    );
    console.log("result line 132", deletedIndexes[21]);
    console.log(
      "line 135",
      !deletedIndexes[
        deletedIndexes.findIndex((comment) => {
          return comment === `${req.params.commentID}`;
        })
      ]
    );
    if (
      !deletedIndexes[
        deletedIndexes.findIndex((comment) => {
          return comment === `${req.params.commentID}`;
        })
      ]
    ) {
      let sql = ` DELETE FROM comments WHERE _id = ${req.params.commentID};`;

      db.query(sql, (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result);
        return result;
      });
      console.log(deletedIndexes);
      //making the delete change

      let recordSql = `INSERT INTO DeletedRecords (commentID ) VALUES (${req.params.commentID});`;
      db.query(recordSql, (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result);

        return result;
      });
      message = "single deleted comment";
    }
    let getSql = `SELECT * FROM comments`;
    db.query(getSql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(message);
      emptyhandling(result, res);
    });
  });
  //console.log("result length", resultLength)
  //if (deletedIndexes.length >= 9) {
  //    console.log("result length", resultLength)
  //    console.log("deletedindexes length", deletedIndexes.length)
  //    console.log("deletedindexes after SELECT", deletedIndexes)
  //}
});
module.exports = commentRouter;
