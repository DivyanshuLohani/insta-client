import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/nav.css";
import "../css/dropdown.css";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import axios, { BASE_URL } from "../api/axios";

export default function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState("");
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const doSearch = async () => {
      try {
        if (search === "") {
          return;
        }
        if (search.length <= 3) return;
        const resp = await axios.get(`/search?q=${search}`);
        setSearchResults(resp.data);
      } catch (e) {}
    };
    doSearch();
  }, [search]);

  useEffect(() => {
    setSearch("");
  }, [location]);

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
        AppSocial
      </Link>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <FaBars className="fas fa-bars" />
      </label>
      <ul>
        <div className="search">
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <label htmlFor="search" aria-readonly="true">
            Search
          </label>
          <div className={search ? `hidden ${theme}` : "d-none"}>
            {searchResults.map((value, index) => {
              return (
                <Link
                  to={`/users/${value.username}`}
                  key={index}
                  className="dropdown-item top-bar"
                >
                  <img
                    src={
                      BASE_URL + (value.avatar ? value.avatar : "/media/none")
                    }
                    alt=""
                    className="circular"
                  />
                  <div className="post-name">{value.username}</div>
                </Link>
              );
            })}
          </div>
        </div>

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
                  src={BASE_URL + auth.avatar}
                  alt=""
                  width={35}
                  height={35}
                  style={{ position: "relative", top: "0.8rem" }}
                />
                <div className={`dropdown-content ${theme}`}>
                  <span className="dropdown-item">{auth.username}</span>
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
                  <span
                    className="dropdown-item glow-active-red"
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </div>
              </span>
            </li>
          </>
        ) : (
          <>
            <li>
              <span
                onClick={(e) => {
                  navigate("/login", { state: { from: location } });
                }}
                className="glow-active nav-link"
                style={{ cursor: "pointer" }}
              >
                Login
              </span>
            </li>
            <li
              className="glow-active nav-item"
              style={{ marginRight: "1rem", marginLeft: "0.5rem" }}
            >
              <Link
                className="nav-link"
                to={{ pathname: "/signup", state: { from: location } }}
              >
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
