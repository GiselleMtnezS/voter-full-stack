const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
// const mongoose = require("mongoose");
const mysql = require("mysql");
const expressJwt = require("express-jwt");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "774107",
  database: "votesdb",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL");
});
app.use("/", require("./routes/authRouter"));
app.use("/app", expressJwt({ secret: process.env.SECRET }));
app.use("/app/user", require("./routes/userRouter.js"));
app.use("/app/issues", require("./routes/issuesRouter.js"));
app.use("/app/comments", require("./routes/commentsRouter.js"));

app.get("/createdb", (req, res) => {
  let sql = `CREATE DATABASE votesdb;`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    let sql = `USE votesdb;`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.send("using votesdb Database");
    });
  });
});
//this one seems kind of unnecessary since the "use database" query is not maintained to queries from another get request and it would be super redundant to add "use database" on every single request- but is working too.

app.get("/createdb/tables", (req, res) => {
  let sql = `CREATE TABLE IF NOT EXISTS Issues(_id SERIAL PRIMARY KEY ,
    title VARCHAR(100),
    description VARCHAR(1000), 
    upVotes INT,
    downVotes INT,
    date DATE,
    userID VARCHAR(100));`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    let sql = `CREATE TABLE IF NOT EXISTS Comments(_id SERIAL PRIMARY KEY ,
    text VARCHAR(100),
    date DATE,
    issueID VARCHAR(100),
    userID VARCHAR(100));`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);

      let sql = `CREATE TABLE IF NOT EXISTS Users(_id SERIAL PRIMARY KEY ,
    name VARCHAR(100),
    username VARCHAR(50), 
    password VARCHAR(50), 
    birthdate DATE
        );`;
      db.query(sql, (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result);

        res.send("Tables created");
      });
    });
  });
});

//Yeyyy is working. All 3 tables get created under one get request.

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

app.listen(3030, () => {
  console.log("Server is running on port 3030");
});
module.exports = { db: db };
