import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toSignup() {
    navigate("/signup");
  }

  function login() {
    axios
      .post("http://localhost:3636/user/login", { email, password })
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/profile");
        } else {
          alert(data.msg);
        }
      });
  }

  return (
    <div className="signup-login-container">
      <h1 className="app-title">Welcome to LinkShare</h1>
      <div className="input-button-container">
        <input
          type="email"
          placeholder="email"
          className= "signup-login-inputs"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          className= "signup-login-inputs"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="signup-login-btn"
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
      </div>
      <p className="info-text" >
        If you do not have an account{" "}
        <button
          className="signup-login-switch-btn"
          onClick={() => {
            toSignup();
          }}
        >
          {" "}
          Signup
        </button>
      </p>
    </div>
  );
}

export default Login;