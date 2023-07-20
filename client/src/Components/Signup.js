import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  function toLogin() {
    navigate("/");
  }
    function signup(){
      axios.post("http://localhost:3636/user/signup", {email,password}).then(({ data}) => {
        if(data.token) {
          localStorage.setItem("token",data.token);
          navigate("/profile")
        }else{
          alert(data.msg)
        }
    })
  }

  return ( 
    <div className="signup-login-container">
    <h1 className="app-title">Welcome to LinkShare</h1>
    <div className="input-button-container">
      <input 
      type="email" 
      placeholder="email" 
      className= "signup-login-inputs"
      onChange = {(e)=>{
        setEmail(e.target.value);
      }}
      />
      <input 
      type="password" 
      placeholder="password"
      className= "signup-login-inputs"
      onChange = {(e)=>{
        setPassword(e.target.value)
      }}
      />
      <button
      className="signup-login-btn"
       onClick={()=>{
        signup();
      }}>
        Signup</button>
        </div>
      <p className="info-text" >
        If you have an account {" "}
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
  