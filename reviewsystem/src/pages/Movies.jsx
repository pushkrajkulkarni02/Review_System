import { useState } from "react";
import Navbar from "./Navbar";
import "./Movies.css";

const moviesList = [
  "Inception",
  "Interstellar",
  "Avatar",
  "Titanic",
  "The Dark Knight"
];

function Movies() {
  const [search, setSearch] = useState("");

  const filteredMovies = moviesList.filter(movie =>
    movie.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>Search Movies</h2>

        <input
          type="text"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ul>
          {filteredMovies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Movies;
