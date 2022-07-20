import React, { useState, useRef, useEffect } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function Register() {
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
      <h2>SignUp AppSocial</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            value={name}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Username"
            value={username}
            required
          />
        </Form.Group>
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
          Already have an account? <Link to="/login">Login</Link>
        </div>

        <Button variant="primary" style={{ width: "100%" }} type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
