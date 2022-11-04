import React, { useState } from "react"
import { useNavigate } from "react-router";
import axios from "axios";


export default function (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, {
        email: email,
        password: password,
      })
      .then((data) => {
        localStorage.setItem('access_token', data.data.access_token)
        history("/");
      })
      .catch(function (error) {
        if (error.response.status===401) {
          alert("Please check your credentials")
        } 
    
      });
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Register <a href="/register">now?</a>
          </p>
        </div>
      </form>
    </div>
  )
}