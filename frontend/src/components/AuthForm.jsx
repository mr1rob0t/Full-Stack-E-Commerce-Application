// Import necessary libraries and hooks
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../store/authSlice";

const AuthForm = ({ isLogin }) => {
  // Local state to manage form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Determine the endpoint based on whether it's a login or registration form
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      // Make an API call to the backend
      const response = await axios.post(endpoint, {
        username,
        email,
        password,
      });
      if (isLogin) {
        // Dispatch login action and navigate to home page on successful login
        dispatch(login(response.data));
        navigate("/");
      } else {
        // Show success message and navigate to login page on successful registration
        alert("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Show username field only for registration */}
      {!isLogin && (
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      )}
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">{isLogin ? "Login" : "Register"}</button>
    </form>
  );
};

export default AuthForm;
