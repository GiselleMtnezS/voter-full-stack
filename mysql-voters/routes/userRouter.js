const express = require("express");
const userRouter = express.Router();
const UserObject = require("../models/user");
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
withoutPassword = (user) => {
  delete user.password;
  delete user._id;
  // delete user.withoutPassword,
  // delete user.checkPassword,
  delete user.username;
  return user;
};
//get all users
userRouter.get("/", (req, res, next) => {
  let sql = `SELECT * FROM users`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500);
      throw err;
    }
    for (let i = 0; i < result.length; i++) {
      console.log(result[i]);
      withoutPassword(result[i]);
    }
    return emptyhandling(result, res);
  });
});
//get all users
userRouter.get("/profile", (req, res, next) => {
  let sql = `SELECT * FROM users WHERE _id = ${req.user._id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500);
      throw err;
    }

    return emptyhandling(result, res);
  });
});
//getOne user
userRouter.put("/", (req, res, next) => {
  console.log(req.user);

  console.log(req.body.name === "undefined");
  if (req.body.name !== undefined) {
    let sqlText = `UPDATE users SET name = '${req.body.name}' WHERE _id = ${req.user._id};`;
    db.query(sqlText, (err, result) => {
      if (err) {
        throw err;
      }
      console.dir(result);
      return result;
    });
  } //making the update changes
  if (req.body.password !== undefined) {
    let sqlDes = `UPDATE users SET password = '${req.body.password}' WHERE _id = ${req.user._id};`;
    db.query(sqlDes, (err, result) => {
      if (err) {
        throw err;
      }
      console.dir(result);
      return result;
    });
  }
  let getSql = `SELECT * FROM users WHERE _id = ${req.user._id}`;
  db.query(getSql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("single user edited");
    emptyhandling(result, res);
  }); //returning specific object with all its information including updates.
});
let deletedIndexes = [];
userRouter.delete("/", (req, res, next) => {
  //// keeping track of userids deleted, deleting only If it has not been deleted before (if the user id entered is not in the deleted records table.)
  var message = "nothing deleted yet";
  let getRecordSql = `SELECT userID FROM DeletedRecords`;
  db.query(getRecordSql, (err, result) => {
    if (err) {
      throw err;
    }

    for (let i = 0; i < result.length; i++) {
      deletedIndexes.push(result[i].userID);
    }
    // console.log(
    //   "result line 130",
    //   deletedIndexes.findIndex((user) => {
    //     return user === `${req.user._id}`;
    //   })
    // );
    console.log("result line 132", deletedIndexes[21]);
    // console.log(
    //   "line 135",
    //   !deletedIndexes[
    //     deletedIndexes.findIndex((user) => {
    //       return user === `${req.user._id}`;
    //     })
    //   ]
    // );
    if (
      !deletedIndexes[
        deletedIndexes.findIndex((user) => {
          return user === `${req.user._id}`;
        })
      ]
    ) {
      let sql = ` DELETE FROM users WHERE _id = ${req.user._id};`;

      db.query(sql, (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result);
        return result;
      });
      console.log(deletedIndexes);
      //making the delete change

      let recordSql = `INSERT INTO DeletedRecords (userID ) VALUES (${req.user._id});`;
      db.query(recordSql, (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result);

        return result;
      });
      message = "single deleted user";
    }
    let getSql = `SELECT * FROM users`;
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
module.exports = userRouter;
