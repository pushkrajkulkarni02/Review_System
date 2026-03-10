import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BookDetails.css";
import axios from "axios";
import toast from "../components/Toast";

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState("");
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchBookData();
    }, [id]);

    const fetchBookData = async () => {
        setLoading(true);
        try {
            const bookRes = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
            const reviewsRes = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}/reviews`);

            setBook(bookRes.data);
            setReviews(reviewsRes.data);
        } catch (error) {
            console.error("Book fetch error:", error);
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
                `${import.meta.env.VITE_API_URL}/books/${id}/reviews`,
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
                `${import.meta.env.VITE_API_URL}/books/${id}/reviews`
            );
            setReviews(reviewsRes.data);
            toast.success("Review submitted successfully");
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
                await axios.delete(`${import.meta.env.VITE_API_URL}/book-reviews/${reviewId}`);
                const reviewsRes = await axios.get(
                    `${import.meta.env.VITE_API_URL}/books/${id}/reviews`
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
            <div className="book-details-page">
                <div className="loading-container">
                    <p>Loading book details...</p>
                </div>
            </div>
        );
    }

    /* ---------------- NOT FOUND ---------------- */
    if (!book) {
        return (
            <div className="book-details-page">
                <div className="error-container">
                    <h2>Book not found</h2>
                    <button onClick={() => navigate("/books")} className="back-btn">
                        Back to Books
                    </button>
                </div>
            </div>
        );
    }

    /* ---------------- MAIN UI ---------------- */
    return (
        <div className="book-details-page">
            <button onClick={() => navigate("/books")} className="back-btn">
                ← Back to Books
            </button>

            <div className="book-hero">
                <div className="book-poster-container">
                    <img
                        src={book.poster || "https://via.placeholder.com/300x450"}
                        alt={book.title}
                        className="book-poster"
                    />
                </div>

                <div className="book-info">
                    <h1>{book.title}</h1>

                    <div className="book-rating-badge">
                        ★ {calculateAverageRating()} ({reviews.length} reviews)
                    </div>

                    <h3>Description :</h3>
                    <p>{book.description || "No description available."}</p>

                    <h3>Author : </h3>
                    <p>{book.author || "Author not available."}</p>
                </div>
            </div>

            {/* WRITE REVIEW */}
            <div className="review-box">

                <h3 className="review-title">Write a Review</h3>

                {/* Rating */}
                <p className="rate-text">Rate this book</p>
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

export default BookDetails;
