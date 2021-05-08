import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    const { logout, token } = props

    //console.log(token)
  return (
      <nav className="navbar" style={{
          display: "flex", justifyContent: "center", background: " linear-gradient(0deg, rgba(17,146,255,1) 0%, rgba(57,151,242,1) 65%, rgba(255,255,255,1) 100%)"
      }}>


          {token ? <> <Link style={{ color: "blue" }} to="/profile">Profile</Link>
              <Link style={{ color: "blue" }} to="/issues">Issues</Link><a href="#top" onClick={logout}>LogOut</a></> : <Link style={{ color: "blue" }} to="/auth">Login/SignUp</Link>}
      </nav>
  );
}
