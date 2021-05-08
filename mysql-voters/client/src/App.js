import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Auth from "./components/auth/auth.js";
import Profile from "./components/profile.js";
import Issues from "./components/issues.js";
import { UserContext } from "./context/userProvider";
export default function App() {
  const { token, logout, allIssues, getIssues } = useContext(UserContext);

  const state = useContext(UserContext);

  return (
    <div
      className="app"
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        gridTemplateRows: "8% auto 10%",
      }}
    >
      <Navbar logout={logout} token={token} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (token ? <Redirect to="profile" /> : <Header />)}
        />
        <Route
          path="/auth"
          render={() => (token ? <Redirect to="profile" /> : <Auth />)}
        />
        <Route
          path="/profile"
          render={() =>
            !token ? <Redirect to="auth" /> : <Profile state={state} />
          }
        />
        <Route
          path="/issues"
          render={() =>
            !token ? (
              <Redirect to="auth" />
            ) : (
              <Issues allIssues={allIssues} getIssues={getIssues} />
            )
          }
        />
      </Switch>
      <Footer token={token} />
    </div>
  );
}
