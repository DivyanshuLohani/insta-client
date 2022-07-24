import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "../css/nav.css";
import "../css/dropdown.css";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import axios from "../api/axios";

export default function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleLogout = async (e) => {
    try {
      await axios.post("/logout");
      setAuth({});
      navigate("/login");
    } catch (e) {}
  };

  const changeTheme = (e) => {
    if (theme === "dark") setTheme("");
    else setTheme("dark");
  };

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
            <li className="">
              <Link className="nav-link glow-active" to="/">
                Home
              </Link>
            </li>
            <li className="">
              <Link className="nav-link glow-active" to="/post">
                Post
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link dropdown">
                <img
                  className="nav-image"
                  src={"http://localhost:8000/api" + auth.avatar}
                  alt=""
                  width={35}
                  height={35}
                  style={{ position: "relative", top: "0.8rem" }}
                />
                <div className="dropdown-content">
                  <Link
                    to={"/users/" + auth.username}
                    className="dropdown-item"
                  >
                    Profile
                  </Link>
                  <span
                    className="dropdown-item"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Dark Mode
                    <label className="switch">
                      <input
                        type="checkbox"
                        onChange={changeTheme}
                        checked={theme === "dark" ? true : false}
                      />
                      <span className="slider round"></span>
                    </label>
                  </span>
                  <span className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </span>
                </div>
              </span>
            </li>
          </>
        ) : (
          <>
            <li
              className=""
              onClick={(e) => <Navigate to="/login" />}
              variant="primary"
            >
              <Link className="glow-active nav-link" to="/login">
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
