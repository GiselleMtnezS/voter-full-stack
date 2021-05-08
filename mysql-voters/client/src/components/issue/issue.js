import React, { useState } from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CommentForm from "./comments/commentForm";
import CommentList from "./comments/commentList";
import { makeStyles } from "@material-ui/core/styles";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import AccessTime from "@material-ui/icons/AccessTime";
import Delete from "@material-ui/icons/Delete";

import Card from "../Card/Card";
import CardHeader from "./../Card/CardHeader.js";
import CardBody from "./../Card/CardBody.js";
import CardFooter from "./../Card/CardFooter.js";
import styles from "./../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);
const capitalize = (str) => {
  if (typeof str === "string") {
    return str.replace(/^\w/, (c) => c.toUpperCase());
  } else {
    return "";
  }
};
const axios = Axios.create();

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function Issue(props) {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const classes = useStyles();
  var { _id, upVotes, downVotes, title, description, date } = props;

  const [votes, setVotesState] = useState({
    upVotes: upVotes,
    downVotes: downVotes,
    errMsg: "",
  });

  const [commentsState, setCommentsState] = useState({
    comments: [],
    errMsg: "",
    issueID: _id,
  });

  const handleAuthErr = (errMsg) => {
    console.dir(errMsg);
    setCommentsState((prevState) => ({
      errMsg,
    }));
  };
  const addComment = (e, newComment) => {
    axios
      .post(`http://localhost:3030/app/comments/${e.target.id}`, newComment)
      .then((res) => {
        console.log("new issue res.data", res.data);
        setCommentsState((prevState) => ({
          comments: [...prevState.comments, res.data],
        }));
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.errMsg) {
          handleAuthErr(err.response.data.errMsg);
        }
      });
  };
  return (
    <div id="issue" className={_id}>
      <Card plain>
        <CardHeader color="info">
          <p className={classes.cardCategory}>
            <span className={classes.whiteText}>{capitalize(description)}</span>
          </p>
        </CardHeader>
        <CardBody>
          <h4
            style={{ display: "flex", justifyContent: "space-between" }}
            className={classes.cardTitle}
          >
            {capitalize(title)}
            <span
              id={_id}
              onMouseOver={(e) => {
                e.target.style.color = "orange";
              }}
              onMouseOut={(e) => {
                e.target.style.color = "red";
              }}
              onClick={(e) => {
                var id = e.currentTarget.id;
                axios
                  .delete(
                    `http://localhost:3030/app/issues/${e.currentTarget.id}`
                  )
                  .then((res) => {
                    alert("Seccesfully Deleted Issue");
                    var div = document.getElementsByClassName(id)[0];

                    div.remove();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <Delete style={{ color: "red" }} />
            </span>
          </h4>
          <p className={classes.cardCategory}>
            <span className={classes.infoText}>
              <ArrowUpward
                onClick={() => {
                  axios
                    .put(`http://localhost:3030/app/issues/${_id}`, {
                      upVotes: votes.upVotes + 1,
                    })
                    .then((res) => {
                      setVotesState((prevState) => ({
                        ...prevState,
                        upVotes: votes.upVotes + 1,
                        errMsg: "",
                      }));
                    })
                    .catch((err) => {});
                }}
                className={classes.upArrowCardCategory}
              />{" "}
              {votes.upVotes}
              <ArrowDownward
                onClick={() => {
                  axios
                    .put(`http://localhost:3030/app/issues/${_id}`, {
                      downVotes: votes.downVotes + 1,
                    })
                    .then((res) => {
                      setVotesState((prevState) => ({
                        ...prevState,
                        downVotes: votes.downVotes + 1,
                        errMsg: "",
                      }));
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                className={classes.downArrowCardCategory}
              />{" "}
              {votes.downVotes} {}
            </span>{" "}
            <span>{votes.errMsg}</span>
          </p>
        </CardBody>
        <CardFooter chart>
          <div className={classes.stats}>
            <AccessTime /> {date}
          </div>
        </CardFooter>
        <CardFooter chart>
          <Container style={{ display: "block" }}>
            <CommentForm
              addComment={addComment}
              errMsg={commentsState.errMsg}
              issueId={_id}
            />
            <Button
              id={_id}
              onClick={() => {
                const getIssueComments = () => {
                  axios
                    .get(`http://localhost:3030/app/comments/issue/${_id}`)
                    .then((res) => {
                      console.log("res.data", res.data);
                      setCommentsState((prevState) => ({
                        comments: res.data || [],
                      }));

                      if (res.data.length === 0) {
                        setCommentsState((prevState) => ({
                          comments: [{ text: "NO COMMENTS HERE; ADD ONE!" }],
                        }));
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      if (
                        err.response &&
                        err.response.data &&
                        err.response.data.errMsg
                      ) {
                        handleAuthErr(err.response.data.errMsg);
                      }
                    });
                };

                getIssueComments();
              }}
            >
              View Comments
            </Button>
          </Container>
        </CardFooter>{" "}
        <CardFooter chart>
          <div className={classes.stats} id="commentsSection">
            <CommentList comments={commentsState.comments} user={loggedUser} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
