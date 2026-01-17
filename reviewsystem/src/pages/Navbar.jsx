import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // login page
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div
        className="navbar-left"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/home")}
      >
        <h2 className="app-name">🎬📚 Movies & Books Review System</h2>
      </div>

      {/* CENTER */}
      <div className="navbar-center">
        <span onClick={() => navigate("/movies")}>Movies</span>
        <span onClick={() => navigate("/books")}>Books</span>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <div className="profile-icon">👤</div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
