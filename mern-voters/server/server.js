const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressJwt = require("express-jwt");
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

mongoose.connect(
  "mongodb://localhost:27017/voterdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    return console.log("Connected to the voter DB");
  }
);

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.use("/auth", require("./routes/authRouter"));
app.use("/app/", expressJwt({ secret: process.env.SECRET }));
app.use("/app/user", require("./routes/userRouter.js"));
app.use("/app/issues", require("./routes/issuesRouter.js"));
app.use("/app/comments", require("./routes/commentsRouter.js"));
// app.use("/postuser", require("./auth_route/newuser.js"));
// app.use("/home", require("./auth_route/home.js")); //list all issues here
// app.use("/profile", require("./auth_route/profile.js"));

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});
var port = 3030;
app.listen(port, () => {
  console.log(`Server is running on port ${port}; with CORS anabled`);
});
