import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./TvSeries.css";
import axios from "axios";
import toast from "../components/Toast";

function TvSeriesDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [series, setSeries] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState("");
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchSeriesData();
    }, [id]);

    const fetchSeriesData = async () => {
        setLoading(true);
        try {
            const seriesRes = await axios.get(
                `${import.meta.env.VITE_API_URL}/tvseries/${id}`
            );

            const reviewsRes = await axios.get(
                `${import.meta.env.VITE_API_URL}/tvseries/${id}/reviews`
            );

            setSeries(seriesRes.data);
            setReviews(reviewsRes.data);
        } catch (error) {
            console.error("TV Series fetch error:", error);
            setSeries(null);
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
                `${import.meta.env.VITE_API_URL}/tvseries/${id}/reviews`,
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
                `${import.meta.env.VITE_API_URL}/tvseries/${id}/reviews`
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
                await axios.delete(`${import.meta.env.VITE_API_URL}/tvseries-reviews/${reviewId}`);
                const reviewsRes = await axios.get(
                    `${import.meta.env.VITE_API_URL}/tvseries/${id}/reviews`
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
                    <p>Loading TV series details...</p>
                </div>
            </div>
        );
    }

    /* ---------------- NOT FOUND ---------------- */
    if (!series) {
        return (
            <div className="movie-details-page">
                <div className="error-container">
                    <h2>TV Series not found</h2>
                    <button onClick={() => navigate("/tvseries")} className="back-btn">
                        Back to TV Series
                    </button>
                </div>
            </div>
        );
    }

    /* ---------------- MAIN UI ---------------- */
    return (
        <div className="movie-details-page">
            <button onClick={() => navigate("/tvseries")} className="back-btn">
                ← Back to TV Series
            </button>

            <div className="movie-hero">
                <div className="movie-poster-container">
                    <img
                        src={series.poster || "https://via.placeholder.com/300x450"}
                        alt={series.title}
                        className="movie-poster"
                    />
                </div>

                <div className="movie-info">
                    <h1>{series.title}</h1>

                    <div className="movie-rating-badge">
                        ★ {calculateAverageRating()} ({reviews.length} reviews)
                    </div>

                    <h3>Description :</h3>
                    <p>{series.description || "No description available."}</p>

                    <h3>Cast : </h3>
                    <p>{series.cast || "Cast not available."}</p>
                </div>
            </div>

            {/* WRITE REVIEW */}
            <div className="review-box">

                <h3 className="review-title">Write a Review</h3>

                {/* Rating */}
                <p className="rate-text">Rate this TV series</p>
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

                {/* USERNAME */}
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

export default TvSeriesDetails;
