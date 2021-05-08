import React from "react";
import { Link } from "react-router-dom";
import "./header.css"
export default function Navbar() {
    return (
        <header className="navbar" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1>Welcome! </h1>

            <h3> Don't forget to Login/SignUp to be able to access all pertinent information: </h3>

            <div id="button"><Link to="/auth">GO!</Link></div>
      
    </header>
  );
}
