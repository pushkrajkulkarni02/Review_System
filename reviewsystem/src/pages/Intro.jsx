import { Link } from "react-router-dom";
import "./intro.css";
import movie1 from "../assets/movie1.jpeg";
import movie2 from "../assets/movie2.jpeg";
import movie3 from "../assets/movie3.jpeg";
import book1 from "../assets/book1.jpeg";
import book2 from "../assets/book2.jpeg";
import book3 from "../assets/book3.jpeg";

export default function Intro() {
  return (
    <div className="intro-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Discover. Review. <br /> Share Your Opinion.
          </h1>
          <p>
            A smart platform to explore, rate, and 
            review your favorite
            <strong> movies and books</strong>.
          </p>

          <div className="hero-buttons">
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button className="secondary">Get Started</button>
            </Link>
          </div>
        </div>

        <div className="hero-posters">
          <img src={movie1} alt="Movie Poster" />
          <img src={movie2} alt="Movie Poster" />
          <img src={movie3} alt="Movie Poster" />
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="features">
        <h2>Why Choose Our Platform?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <span className="icon">⭐</span>
            <h3>Rate & Review</h3>
            <p>Share your honest opinion and see what others think.</p>
          </div>

          <div className="feature-card">
            <span className="icon">🎬📚</span>
            <h3>Movies & Books</h3>
            <p>One place for entertainment and reading lovers.</p>
          </div>

          <div className="feature-card">
            <span className="icon">🔐👤</span>
            <h3>Secure Accounts</h3>
            <p>User-friendly login and personalized experience.</p>
          </div>
        </div>
      </section>

      {/* BOOK SHOWCASE */}
      <section className="showcase">
        <h2>Popular Books</h2>

        <div className="poster-row">
          <img src={book1} alt="Book Cover" />
          <img src={book2} alt="Book Cover" />
          <img src={book3} alt="Book Cover" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Books & Movies Review System | Final Year Project</p>
      </footer>
    </div>
  );
}
