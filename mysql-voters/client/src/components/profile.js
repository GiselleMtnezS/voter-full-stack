import React, { Component } from "react";
import Axios from "axios";
import IssueForm from "./issue/issueForm";
import IssuesList from "./issue/issuesList.js";
const axios = Axios.create();

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      user: "",
      addIssue: "",
      issues: [],
      errMsg: "",
    };
  }

  componentDidMount = () => {
    this.getUserIssues = () => {
      axios
        .get("http://localhost:3030/app/issues/user")
        .then((res) => {
          this.setState((prevState) => ({
            issues: res.data || [],
          }));
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.data && err.response.data.errMsg) {
            this.handleAuthErr(err.response.data.errMsg);
          }
        });
    };

    this.getUserIssues();

    this.setState({
      user: this.props.state.user,
      errMsg: this.props.state.errMsg,
    });
  };

  render() {
    const handleAuthErr = (errMsg) => {
      console.dir(errMsg);
      this.setState((prevState) => ({
        errMsg,
      }));
    };
    const addIssue = (newIssue) => {
      axios
        .post("http://localhost:3030/app/issues", newIssue)
        .then((res) => {
          console.log("new issue res.data", res.data);
          this.setState((prevState) => ({
            issues: [...prevState.issues, res.data[0]],
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
      <div className="profile">
        <h1 style={{ textAlign: "center" }}>
          What would you like to do {this.props.state.user.name}?{" "}
        </h1>
        <IssueForm addIssue={addIssue} errMsg={this.state.errMsg} />

        <IssuesList issues={this.state.issues} />
      </div>
    );
  }
}
