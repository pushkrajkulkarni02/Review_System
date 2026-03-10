import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetails.css";
import axios from "axios";
import toast from "../components/Toast";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMovieData();
  }, [id]);

  const fetchMovieData = async () => {
    setLoading(true);
    try {
      const movieRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies/${id}`
      );

      const reviewsRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies/${id}/reviews`
      );

      setMovie(movieRes.data);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error("Movie fetch error:", error);
      setMovie(null); // IMPORTANT FIX
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    if (!userName.trim() || !review.trim() || rating === 0) {
      toast.warning("Please fill all fields and select a rating");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/movies/${id}/reviews`,
        {
          user_name: userName,
          rating,
          review
        }
      );

      setUserName("");
      setRating(0);
      setReview("");

      const reviewsRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies/${id}/reviews`
      );
      setReviews(reviewsRes.data);
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return "0.0";
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const deleteReview = (reviewId) => {
    toast.confirm("Are you sure you want to delete this review?", async () => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`);
        const reviewsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/movies/${id}/reviews`
        );
        setReviews(reviewsRes.data);
        toast.success("Review deleted successfully");
      } catch (error) {
        console.error("Delete review error:", error);
        toast.error("Failed to delete review");
      }
    });
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="movie-details-page">
        <div className="loading-container">
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  /* ---------------- NOT FOUND ---------------- */
  if (!movie) {
    return (
      <div className="movie-details-page">
        <div className="error-container">
          <h2>Movie not found</h2>
          <button onClick={() => navigate("/movies")} className="back-btn">
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <div className="movie-details-page">
      <button onClick={() => navigate("/movies")} className="back-btn">
        ← Back to Movies
      </button>

      <div className="movie-hero">
        <div className="movie-poster-container">
          <img
            src={movie.poster || "https://via.placeholder.com/300x450"}
            alt={movie.title}
            className="movie-poster"
          />
        </div>

        <div className="movie-info">
          <h1>{movie.title}</h1>

          <div className="movie-rating-badge">
            ★ {calculateAverageRating()} ({reviews.length} reviews)
          </div>

          <h3>Description :</h3>
          <p>{movie.description || "No description available."}</p>

          <h3>Cast : </h3>
          <p>{movie.cast_members || "Cast not available."}</p>
        </div>
      </div>

      {/* WRITE REVIEW */}
      <div className="review-box">

        <h3 className="review-title">Write a Review</h3>

        {/* Rating */}
        <p className="rate-text">Rate this movie</p>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map(n => (
            <span
              key={n}
              className={`star ${n <= (hoverRating || rating) ? "active" : ""}`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
            >
              ★
            </span>
          ))}
        </div>

        {/* USERNAME – stars chya khali */}
        <input
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="username-input"
        />

        {/* BLACK BOX */}
        <div className="review-textbox-wrapper">

          {/* WHITE BOX inside */}
          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="review-textarea"
          />

          <button
            className="submit-review-btn"
            onClick={submitReview}
            disabled={submitting}
          >
            Submit Review
          </button>

        </div>

      </div>

      {/* REVIEWS */}
      <div className="reviews-list">
        <h2>User Reviews ({reviews.length})</h2>

        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="review-card">

              {/* Header */}
              <div className="review-header">
                <span className="review-username">{r.user_name}</span>

                {localStorage.getItem("role") === "admin" && (
                  <button
                    className="delete-review-btn"
                    onClick={() => deleteReview(r.id)}
                    title="Delete review"
                  >
                    ✖
                  </button>
                )}
              </div>

              {/* Rating */}
              <div className="review-rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className={`star ${n <= r.rating ? "filled" : ""}`}>★</span>
                ))}
              </div>

              {/* Review text */}
              <p className="review-text">{r.review}</p>

            </div>
          ))
        )}
      </div>


    </div>
  );
}

export default MovieDetails;
