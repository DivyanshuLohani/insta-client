import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import "../css/login.css";
import useTheme from "../hooks/useTheme";

export default function Register() {
  const { theme } = useTheme();

  const errRef = useRef();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setErrMsg("");
  }, [email, pass, name, username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", {
        email,
        password: pass,
        name,
        username,
      });
      if (response.data.username) {
        const resp = await axios.post("/login", {
          email,
          password: pass,
        });
        const name = resp.data?.name;
        const username = resp.data?.username;
        const token = resp.data?.token;
        const avatar = resp.data?.avatar;
        setAuth({ name, username, email, pass, token, avatar });

        navigate("/", { replace: true });
      }
    } catch (e) {
      if (!e?.response) {
        setErrMsg("No Server Response!");
      } else if (e.response?.status === 400) {
        const data = e.response.data;

        if (data.username) {
          setErrMsg(data.username[0]);
          return;
        }
        if (data.email) {
          setErrMsg(data.email[0]);
          return;
        }
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
    <div className={"container-login " + theme} style={{ minHeight: "100vh" }}>
      <form className="mainform" onSubmit={handleSubmit}>
        <h2 className="login-header">SignUp AppSocial</h2>
        <div style={{ minHeight: "2rem", position: "relative" }}>
          <div
            ref={errRef}
            className={"alert-div " + (errMsg ? "" : "d-none")}
            aria-live="assertive"
          >
            {errMsg}
          </div>
        </div>
        <div className="form-input">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            required
          />
          <label>Name</label>
        </div>
        <div className="form-input">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
            required
          />
          <label>Username</label>
        </div>
        <div className="form-input">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            required
          />
          <label>Email address</label>
        </div>

        <div className="form-input">
          <input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            value={pass}
            required
          />
          <label>Password</label>
        </div>
        <div className="text-muted" style={{ marginBottom: "1rem" }}>
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          type="submit"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
