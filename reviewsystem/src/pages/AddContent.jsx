
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import toast from "../components/Toast";
import "./AddContent.css";

export default function AddContent() {
    const [activeTab, setActiveTab] = useState("movie");
    const navigate = useNavigate();

    const [movieForm, setMovieForm] = useState({
        title: "",
        description: "",
        poster: "",
        cast_members: ""
    });

    const [bookForm, setBookForm] = useState({
        title: "",
        description: "",
        poster: "",
        author: ""
    });

    const [tvForm, setTvForm] = useState({
        title: "",
        description: "",
        poster: "",
        cast_members: ""
    });

    const handleMovieChange = (e) => {
        setMovieForm({ ...movieForm, [e.target.name]: e.target.value });
    };

    const handleBookChange = (e) => {
        setBookForm({ ...bookForm, [e.target.name]: e.target.value });
    };

    const handleTvChange = (e) => {
        setTvForm({ ...tvForm, [e.target.name]: e.target.value });
    };

    const handleMovieSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/add-movie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(movieForm)
            });
            const data = await res.json();
            if (data.status === "success") {
                toast.success("Movie added successfully!");
                setMovieForm({ title: "", description: "", poster: "", cast_members: "" });
            } else {
                toast.error("Failed to add movie: " + data.message);
            }
        } catch (err) {
            toast.error("Server error");
        }
    };

    const handleBookSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/add-book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookForm)
            });
            const data = await res.json();
            if (data.status === "success") {
                toast.success("Book added successfully!");
                setBookForm({ title: "", description: "", poster: "", author: "" });
            } else {
                toast.error("Failed to add book: " + data.message);
            }
        } catch (err) {
            toast.error("Server error");
        }
    };

    const handleTvSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/add-tvseries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tvForm)
            });
            const data = await res.json();
            if (data.status === "success") {
                toast.success("TV Series added successfully!");
                setTvForm({ title: "", description: "", poster: "", cast_members: "" });
            } else {
                toast.error("Failed to add TV series: " + data.message);
            }
        } catch (err) {
            toast.error("Server error");
        }
    };

    return (
        <>
            <Navbar />
            <div className="add-content-page">
                <div className="add-content-container">
                    <h1>Add New Content</h1>

                    <div className="tabs">
                        <button
                            className={activeTab === "movie" ? "active" : ""}
                            onClick={() => setActiveTab("movie")}
                        >
                            Add Movie
                        </button>
                        <button
                            className={activeTab === "book" ? "active" : ""}
                            onClick={() => setActiveTab("book")}
                        >
                            Add Book
                        </button>
                        <button
                            className={activeTab === "tv" ? "active" : ""}
                            onClick={() => setActiveTab("tv")}
                        >
                            Add TV Series
                        </button>
                    </div>

                    <div className="form-box">
                        {activeTab === "movie" && (
                            <form onSubmit={handleMovieSubmit}>
                                <h2>Add a Movie</h2>
                                <input name="title" placeholder="Movie Title" value={movieForm.title} onChange={handleMovieChange} required />
                                <textarea name="description" placeholder="Description/Plot" value={movieForm.description} onChange={handleMovieChange} required />
                                <input name="poster" placeholder="Poster URL" value={movieForm.poster} onChange={handleMovieChange} required />
                                <input name="cast_members" placeholder="Cast Members (comma separated)" value={movieForm.cast_members} onChange={handleMovieChange} />
                                <button type="submit">Add Movie</button>
                            </form>
                        )}
                        {activeTab === "book" && (
                            <form onSubmit={handleBookSubmit}>
                                <h2>Add a Book</h2>
                                <input name="title" placeholder="Book Title" value={bookForm.title} onChange={handleBookChange} required />
                                <textarea name="description" placeholder="Description/Summary" value={bookForm.description} onChange={handleBookChange} required />
                                <input name="poster" placeholder="Cover Image URL" value={bookForm.poster} onChange={handleBookChange} required />
                                <input name="author" placeholder="Author Name" value={bookForm.author} onChange={handleBookChange} required />
                                <button type="submit">Add Book</button>
                            </form>
                        )}
                        {activeTab === "tv" && (
                            <form onSubmit={handleTvSubmit}>
                                <h2>Add a TV Series</h2>
                                <input name="title" placeholder="Series Title" value={tvForm.title} onChange={handleTvChange} required />
                                <textarea name="description" placeholder="Description/Plot" value={tvForm.description} onChange={handleTvChange} required />
                                <input name="poster" placeholder="Poster URL" value={tvForm.poster} onChange={handleTvChange} required />
                                <input name="cast_members" placeholder="Cast Members (comma separated)" value={tvForm.cast_members} onChange={handleTvChange} />
                                <button type="submit">Add TV Series</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}   