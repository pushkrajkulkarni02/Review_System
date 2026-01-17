import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.status === "success") {
      navigate("/home"); // ✅ THIS MUST EXIST
    } else {
      alert("Incorrect email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input name="email" placeholder="Email" onChange={handleChange} required/>
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required/>
          <button type="submit">Login</button>
          <p>
            New user?{" "}
            <span style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "600" }}onClick={() => navigate("/register")}>Register then
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
