const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const UserObject = require("../models/user");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "774107",
  database: "votesdb",
});

const jwt = require("jsonwebtoken");
//add new user DIRECTLY
emptyhandling = (found, res) => {
  !found.length //is 2 equal signs in purpose
    ? res.status(204).send()
    : res.status(200).send(found);
};

authRouter.post("/signup", (req, res, next) => {
  let sql = `SELECT username FROM users`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(
      result[
        result.findIndex((user) => {
          return user.username === `${req.body.username}`;
        })
      ]
    );
    if (
      result[
        result.findIndex((user) => {
          return user.username === `${req.body.username}`;
        })
      ]
    ) {
      res.status(403);
      return next(new Error("That username is taken"));
    }
    let date = new Date();
    req.body.date = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;

    console.log("req.body", req.body);
    // UserObject.hashPassword(next, req.body);
    // console.log("function hash", UserObject.hashPassword(next, req.body));
    // console.log("req.body after hash", req.body);

    // const user = this;
    // if (!user.isModified("password")) return next();

    // var hash = bcrypt.hash(req.body.password, 10, (err, hash) => {
    //   if (err) return next(err);

    //   req.body.password = hash;
    //   console.log("hash", hash);
    //   console.log("user at hash function", req.body.password);
    //   return hash;
    // });
    // console.log("hash, 63", hash);

    let newUser = new UserObject(
      req.body.name,
      req.body.username,
      req.body.date,
      req.body.password
    );

    // console.log("blue blue blue blue", newUser);
    // console.log("newUser", newUser);

    var userObj = {
      name: newUser.name,
      username: newUser.username,
      birthdate: newUser.birthdate,
      password: newUser.password,
    };
    console.log("userObj after hash", userObj);

    let sql = `INSERT INTO users (name, username, password, birthdate) VALUES ('${userObj.name}','${userObj.username}', '${userObj.password}','${userObj.birthdate}' );`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log("after insert", userObj);
      // return res.status(201).send(newUser);
      // UserObject.withoutPassword();
      // emptyhandling(result, res);

      let sql = `SELECT * FROM users;`;
      db.query(sql, (err, result) => {
        if (err) {
          throw err; 
        }

        console.log("signedup user", result);
        let { _id, name, username, password, birthdate } = result[
          result.length - 1
        ];
        let newUser = { _id, name, username, password, birthdate };
        const token = jwt.sign(newUser, process.env.SECRET);
        return res.status(201).send({ token, user: newUser });
      });
    });
    // }
  });
});
//   });
// });

//login
authRouter.post("/", (req, res, next) => {
  let usernameSql = `SELECT username FROM users`;
  db.query(usernameSql, (err, result) => {
    if (err) {
      throw err;
    }
    // console.log(
    //   result[
    //     result.findIndex((user) => {
    //       return user.username === `${req.body.username}`;
    //     })
    //   ]
    // );
    if (
      !result[
        result.findIndex((user) => {
          return user.username === `${req.body.username}`;
        })
      ]
    ) {
      res.status(403);
      return next(new Error("Username or Password are incorrect"));
    }
    let passwordSql = `SELECT password FROM users WHERE username= '${req.body.username}'`;
    db.query(passwordSql, (err, result) => {
      if (err) {
        throw err;
      }
      if (
        !result[
          result.findIndex((userobj) => {
            return userobj.password === `${req.body.password}`;
          })
        ]
      ) {
        res.status(403);
        return next(new Error("Username or Password are incorrect"));
      }
    });
    let sql = `SELECT * FROM users WHERE username='${req.body.username}' AND password='${req.body.password}'`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      // let { _id, name, username, date, password } =result[0] ;
      // console.log(_id, name, username, date, password);
      // UserObject.Name = result[0].name;
      // UserObject.username = result[0].username;
      // UserObject.birthdate = result[0].birthdate;
      // UserObject.password = result[0].password;
      console.log("result", result);
      const newUser = new UserObject(
        result[0].name,
        result[0].username,
        result[0].birthdate,
        result[0].password
      );
      // console.log("userObj", userObj);

      // UserObject.checkPassword(newUser.password, (err, isMatch) => {
      //   console.log("isMatch", isMatch);
      //   if (err) {
      //     console.log("err", err);
      //     res.status(403);
      //     return next(new Error("username or Password are incorrect"));
      //   }

      //   if (!isMatch) {
      //     res.status(403);
      //     return next(new Error("username or password are incorrect"));
      //   }
      // console.log("userobject withoutpassword", UserObject.withoutPassword());
      // console.log("new user 151", newUser);
      // newUser.withoutPassword();
      // console.log("new user 153", newUser);
      // delete UserObject.withoutPassword;
      // delete UserObject.checkPassword;

      var { name, username, birthdate, password, _id } = result[0];
      var userObj = {
        _id,
        name,
        username,
        birthdate,
        password,
      };
      console.log("line 149", userObj);
      const token = jwt.sign(userObj, process.env.SECRET);
      return res.status(200).send({ token, user: result[0] });
      // });
    });
  });
});

module.exports = authRouter;
