import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import "../css/nav.css";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const { auth } = useAuth();
  return (
    <nav className="nav">
      <Link className="logo glow-active" to="/">
        Navbar
      </Link>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <FaBars className="fas fa-bars" />
      </label>
      <ul>
        {auth?.name ? (
          <>
            <li className="glow-active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="glow-active">
              <Link className="nav-link" to="/post">
                Post
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/users/" + auth.username}>
                <img
                  className="nav-image"
                  src={"http://localhost:8000/api" + auth.avatar}
                  alt=""
                  width={35}
                  height={35}
                  style={{ position: "relative", top: "0.8rem" }}
                />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li
              className=""
              onClick={(e) => <Navigate to="/login" />}
              variant="primary"
            >
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
            </li>
            <li
              className="glow-active nav-item"
              style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
            >
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
