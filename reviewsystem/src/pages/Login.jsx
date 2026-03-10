import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import toast from "../components/Toast";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });


  const [role, setRole] = useState("user");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(import.meta.env.VITE_API_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.status === "success") {
      // Check if user role matches selected role (optional UX enforcement)
      const userRole = data.user.role || "user";

      if (role === "admin" && userRole !== "admin") {
        toast.error("You are not an Admin!");
        return;
      }

      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("user_id", data.user.id);
      localStorage.setItem("role", userRole);
      navigate("/home");
    } else if (data.status === "pending") {
      toast.error(data.message || "Approval pending!");
    } else {
      toast.error("Incorrect email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
          <p>
            New user?{" "}
            <span style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "600" }} onClick={() => navigate("/register")}>Register then
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
