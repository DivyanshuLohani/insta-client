import React, { useState, useRef, useEffect } from "react";

import axios from "../api/axios";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import "../css/login.css";

const LOGIN_URL = "/login";

export default function Login() {
  const { setAuth } = useAuth();

  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const { theme } = useTheme();

  useEffect(() => {
    setErrMsg("");
  }, [email, pass]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        LOGIN_URL,
        {
          email: email,
          password: pass,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const name = resp.data?.name;
      const username = resp.data?.username;
      const token = resp.data?.token;
      const avatar = resp.data?.avatar;
      setAuth({ name, username, email, pass, token, avatar });
      setEmail("");
      setPass("");
      navigate(from, { replace: true });
    } catch (e) {
      if (!e?.response) {
        setErrMsg("No Server Response!");
      } else if (e.response?.status === 400) {
        setErrMsg("Missing Feilds");
      } else if (e.response?.status === 404) {
        setErrMsg("User Not Found!");
      } else if (e.response?.status === 401) {
        setErrMsg("Email or password incorrect");
      } else if (e.response?.status === 403) {
        setErrMsg("Email or password incorrect");
      } else {
        setErrMsg("Something Went Wrong. Try again later");
      }
      errRef.current.focus();
    }
  };
  return (
    <div className={theme + " container-login"} style={{ minHeight: "100vh" }}>
      <div className="mainform">
        <h2 className="login-header">Login To AppSocial</h2>
        <div style={{ minHeight: "2rem", position: "relative" }}>
          <div
            ref={errRef}
            className={"alert-div " + (errMsg ? "" : "d-none")}
            aria-live="assertive"
          >
            {errMsg}
          </div>
        </div>
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="form-input">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              // placeholder="Enter email"
              value={email}
              id="email"
              required
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-input">
            <input
              onChange={(e) => setPass(e.target.value)}
              type="password"
              // placeholder="Password"
              value={pass}
              required
            />
            <label>Password</label>
          </div>
          <div className="text-muted" style={{ marginBottom: "1rem" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
