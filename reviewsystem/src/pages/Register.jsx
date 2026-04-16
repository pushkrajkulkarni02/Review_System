import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import toast from "../components/Toast";

function Register() {
  const navigate = useNavigate();


  const [role, setRole] = useState("user");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(import.meta.env.VITE_API_URL + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, role })
    });

    const data = await res.json();

    if (data.status === "success") {
      toast.success("Registration Successful!");
      navigate("/login");
    } else if (data.status === "pending") {
      toast.success("Request Sent to Main Admin! Please wait for approval.");
      navigate("/login");
    } else {
      toast.error(data.message || "Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Register</h2>


          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <span
              style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "600" }}
              onClick={() => navigate("/login")}
            >
              Login then
            </span>
          </p>
        </form>
      </div>
    </div>
  );

}

export default Register;

