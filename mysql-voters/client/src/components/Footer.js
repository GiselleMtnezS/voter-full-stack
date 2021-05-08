import React from "react";
import { Link } from "react-router-dom";

export default function Footer(props) {
    const {token} = props
  return (
      <footer className="footer" style={{ display: "flex", justifyContent: "center", background: "linear-gradient(0deg, rgba(1,6,12,1) 0%, rgba(1,6,82,1) 63%, rgba(1,6,133,1) 82%, rgba(0,5,255,1) 100%)"}}>
          

          {token ? <> <Link style={{ color: "lightblue" }} to="/profile">Profile</Link>
              <Link style={{ color: "lightblue" }} to="/issues">Issues</Link></> : <Link style={{ color: "lightblue" }} to="/auth">Login/SignUp</Link>}
    </footer>
  );
}
