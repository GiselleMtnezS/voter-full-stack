import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/userProvider";
import App from "./App.js";

ReactDOM.render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>,
  document.getElementById("root")
);
