const express = require("express");
const issueRouter = express.Router();
const IssueObject = require("../models/issue");
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

//get issues
issueRouter.get("/", (req, res, next) => {
  let sql = `SELECT * FROM issues ORDER BY upVotes DESC`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("all issues");
    emptyhandling(result, res);
  });
});

//add New Issue
issueRouter.post("/", (req, res, next) => {
  console.log(req.user);
  //req.body.userID = req.user._id;
  req.body.userID = req.user._id;
  console.log(req.user);
  let date = new Date();
  req.body.date = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  let newIssue = new IssueObject(
    req.body.title,
    req.body.description,
    req.body.date,
    req.body.userID,
    0,
    0
  );
  console.log(newIssue);
  let sql = `INSERT INTO issues (title, description, date, userID) VALUES ('${req.body.title}','${req.body.description}','${req.body.date}', '${req.body.userID}' );`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    let sql = `SELECT * FROM issues WHERE title= '${req.body.title}' AND description = '${req.body.description}' AND date = '${req.body.date}' AND userID = '${req.body.userID}'  `;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      return res.status(201).send(result);
    });
  });
});

//Get Issues by User
issueRouter.get("/user/", (req, res, next) => {
  let sql = `SELECT * FROM issues WHERE userid = '${req.user._id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("issues by user", result);
    emptyhandling(result, res);
  });
});

//Get Issue by ID
issueRouter.get("/:issueID", (req, res, next) => {
  let sql = `SELECT * FROM issues WHERE _id = ${req.params.issueID}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("single issue by id");
    emptyhandling(result, res);
  });
});

//update issue info
issueRouter.put("/:issueID", (req, res, next) => {
  console.log(req.params);
  console.log(req.body.title === "undefined");
  if (req.body.title !== undefined) {
    let sqlText = `UPDATE issues SET title = '${req.body.title}' WHERE _id = ${req.params.issueID};`;
    db.query(sqlText, (err, result) => {
      if (err) {
        throw err;
      }
      console.dir(result);
      return result;
    });
  } //making the update changes
  if (req.body.description !== undefined) {
    let sqlDes = `UPDATE issues SET description = '${req.body.description}' WHERE _id = ${req.params.issueID};`;
    db.query(sqlDes, (err, result) => {
      if (err) {
        throw err;
      }
      console.dir(result);
      return result;
    });
  }
  if (req.body.upVotes !== undefined) {
    let sqlText = `UPDATE issues SET upVotes = '${req.body.upVotes}' WHERE _id = ${req.params.issueID};`;
    db.query(sqlText, (err, result) => {
      if (err) {
        throw err;
      }
      console.dir(result);
      return result;
    });
  } //making the update changes
  if (req.body.downVotes !== undefined) {
    let sqlText = `UPDATE issues SET downVotes = '${req.body.downVotes}' WHERE _id = ${req.params.issueID};`;
    db.query(sqlText, (err, result) => {
      if (err) {
        throw err;
      }
      console.dir(result);
      return result;
    });
  } //making the update changes
  let getSql = `SELECT * FROM issues WHERE _id = ${req.params.issueID}`;
  db.query(getSql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("single issue edited");
    emptyhandling(result, res);
  }); //returning specific object with all its information including updates.
});
let deletedIndexes = [];
issueRouter.delete("/:issueID", (req, res, next) => {
  //// keeping track of issueids deleted, deleting only If it has not been deleted before (if the issue id entered is not in the deleted records table.)
  var message = "nothing deleted yet";
  let getRecordSql = `SELECT issueID FROM DeletedRecords`;
  db.query(getRecordSql, (err, result) => {
    if (err) {
      throw err;
    }

    for (let i = 0; i < result.length; i++) {
      deletedIndexes.push(result[i].issueID);
    }
    // console.log(
    //   "result line 130",
    //   deletedIndexes.findIndex((issue) => {
    //     return issue === `${req.params.issueID}`;
    //   })
    // );
    console.log("result line 132", deletedIndexes[21]);
    // console.log(
    //   "line 135",
    //   !deletedIndexes[
    //     deletedIndexes.findIndex((issue) => {
    //       return issue === `${req.params.issueID}`;
    //     })
    //   ]
    // );
    if (
      !deletedIndexes[
        deletedIndexes.findIndex((issue) => {
          return issue === `${req.params.issueID}`;
        })
      ]
    ) {
      let sql = ` DELETE FROM issues WHERE _id = ${req.params.issueID};`;

      db.query(sql, (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result);
        return result;
      });
      console.log(deletedIndexes);
      //making the delete change

      let recordSql = `INSERT INTO DeletedRecords (issueID ) VALUES (${req.params.issueID});`;
      db.query(recordSql, (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result);

        return result;
      });
      message = "single deleted issue";
    }
    let getSql = `SELECT * FROM issues`;
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
module.exports = issueRouter;
