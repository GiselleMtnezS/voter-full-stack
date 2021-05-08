import React, { useState } from "react";
import Axios from "axios";
export const UserContext = React.createContext();

const axios = Axios.create();

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function UserProvider(props) {
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    issues: [],
    allIssues: JSON.parse(localStorage.getItem("IssuesAll")) || [],
    errMsg: "",
  };
  const [userState, setUserState] = useState(initialState);

  function handleAuthErr(errMsg) {
    console.dir(errMsg);
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  function signup(credentials) {
    console.log(credentials);
    const newUser = {
      Name: credentials.Name,
      username: credentials.username,
      password: credentials.password,
      birthdate: "20002015",
    };
    console.log(newUser);

    Axios.post("http://localhost:3030/auth/signup", newUser)
      .then((res) => {
        console.log(res.data);

        const { user, token } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.errMsg) {
          handleAuthErr(err.response.data.errMsg);
        }
      });
  }
  function login(credentials) {
    console.log(credentials);

    Axios.post("http://localhost:3030/auth/", credentials)
      .then((res) => {
        const { user, token } = res.data;
        console.log(res.data);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // getUserIssues();
        // getIssues();

        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.errMsg) {
          handleAuthErr(err.response.data.errMsg);
        }
      });
    console.log(Axios);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("IssuesByUser");
    localStorage.removeItem("IssuesAll");
    setUserState({
      user: {},
      token: "",
      issues: [],
      allIssues: [],
    });
  }

  ///////////////////////////////////////////////////////   TODOS START HERE ////////////////////////

  function getIssues() {
    axios
      .get("http://localhost:3030/app/issues")
      .then((res) => {
        console.log(res.data);
        setUserState((prevState) => ({
          ...prevState,
          allIssues: res.data,
        }));
        // localStorage.setItem("IssuesAll", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.errMsg) {
          handleAuthErr(err.response.data.errMsg);
        }
      });
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        logout,
        login,
        // addIssue,
        getIssues,
        // getUserIssues,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
