import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toLogin() {
    navigate("/");
  }
  function signup() {
    axios
      .post(`${backendUrl}/user/signup`, { email, password })
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/links");
        } else {
          alert(data.msg);
        }
      });
  }

  return (
    <div className="signup-login-container app-layout">
      <h1 className="app-title ">Welcome to LinkShare</h1>
      <p className="headline-text">
        Create your Digital Identity in minutes and <br />
        Share Your Online Presence{" "}
        <span> with a single link!</span>
      </p>
      <div className="input-button-container">
        <input
          type="email"
          placeholder="email"
          className="signup-login-inputs"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          className="signup-login-inputs"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="btn primary-btn"
          onClick={() => {
            signup();
          }}
        >
          Signup
        </button>
      </div>
      <p className="info-text">
        If you have an account{" "}
        <button
          className="signup-login-switch-btn"
          onClick={() => {
            toLogin();
          }}
        >
          {" "}
          Login
        </button>
      </p>
    </div>
  );
}
export default Signup;
