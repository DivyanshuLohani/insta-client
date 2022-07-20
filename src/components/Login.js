import React, { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

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
    <div className="my-4 mx-4">
      <div style={{ minHeight: "5rem" }}>
        <Alert
          ref={errRef}
          className={errMsg ? "" : "d-none"}
          variant="danger"
          key="danger"
          aria-live="assertive"
        >
          {errMsg}
        </Alert>
      </div>
      <h2>Login To AppSocial</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            value={email}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Password"
            value={pass}
            required
          />
        </Form.Group>
        <div className="my-3 text-muted">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>

        <Button variant="primary" style={{ width: "100%" }} type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
