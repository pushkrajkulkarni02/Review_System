import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("name");

    if (storedEmail) setEmail(storedEmail);
    if (storedName) setName(storedName);
  }, []);

  const saveName = () => {
    if (!tempName.trim()) return;

    setName(tempName);
    localStorage.setItem("name", tempName);
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {name ? name.charAt(0).toUpperCase() : "U"}
        </div>

        <h2 className="profile-name">{name || "User"}</h2>
        <p className="profile-sub">Account Information</p>

        <div className="profile-info">
          <div className="info-row">
            <span>Email</span>
            <span>{email}</span>
          </div>

          <div className="info-row">
            <span>Status</span>
            <span className="active">Logged In</span>
          </div>
        </div>

        {!editing ? (
          <button
            className="profile-btn"
            onClick={() => {
              setTempName(name);
              setEditing(true);
            }}
          >
            Change Username
          </button>
        ) : (
          <div className="edit-box">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="New username"
            />
            <button onClick={saveName}>Save</button>
          </div>
        )}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
