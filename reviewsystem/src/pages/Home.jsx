import React from "react";
import Navbar from "./Navbar";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-card">
          <h1>Welcome to Review System</h1>
          <p>You have successfully logged in.</p>
        </div>
      </div>
    </>
  );
}

export default Home;
