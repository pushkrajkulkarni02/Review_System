import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Movies.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Movies() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/movies");
        setAllMovies(res.data);
      } catch (err) {
        console.error("Error fetching movies", err);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredMovies([]);
    } else {
      const results = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredMovies(results);
    }
  }, [search, allMovies]);

  return (
    <>
      <Navbar />
      <div className="page-container">

        {/* Search Bar */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "60%",
              padding: "12px",
              borderRadius: "25px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              textAlign: "center"
            }}
          />
        </div>

        {/* Search Results */}
        {search.trim() !== "" && (
          <div className="search-results">
            {filteredMovies.length > 0 ? (
              <div className="row-cards" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
                {filteredMovies.map(movie => (
                  <div key={movie.id} className="card">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="card"
                      onClick={() => navigate(`/movies/${movie.id}`)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h2>Movie not found</h2>
              </div>
            )}
            <hr style={{ margin: "40px 0", borderColor: "#334155" }} />
          </div>
        )}

        {localStorage.getItem("role") === "admin" && (
          <div style={{ textAlign: "right", padding: "10px" }}>
            <button
              className="add-btn"
              onClick={() => navigate("/add-content")}
            >
              + Add Movie
            </button>
          </div>
        )}


        {search.trim() === "" && (
          <>
            <div className="row">
              <h2>Top Rated Movies</h2>
              <div className="row-cards">
                <div className="card"><img src="https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" alt="Godfather" className="card" onClick={() => navigate("/movies/1")}></img></div>
                <div className="card"><img src="https://wallpapercave.com/wp/wp6568157.jpg" alt="3 Idiots" className="card" onClick={() => navigate("/movies/2")}></img></div>
                <div className="card"><img src="https://wallpapercave.com/wp/wp8340497.jpg" alt="Duniyadari" className="card" onClick={() => navigate("/movies/3")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg" alt="The Shawshank Redemption" className="card" onClick={() => navigate("/movies/4")}></img></div>
                <div className="card"><img src="https://wallpapercave.com/wp/wp6653101.jpg" alt="Gangs of Wasseypur" className="card" onClick={() => navigate("/movies/5")}></img></div>
                <div className="card"><img src="https://thereviewmonk.com/assets/media/movies/posters/w300/7c7c4e6f534f3595025d70e6725000ac.jpg" alt="Sairat" className="card" onClick={() => navigate("/movies/6")}></img></div>
                <div className="card"><img src="https://wallpapercave.com/wp/wp10642383.jpg" alt="Natsamrat" className="card" onClick={() => navigate("/movies/7")}></img></div>
                <div className="card"><img src="https://wallpapercave.com/wp/wp12086598.jpg" alt="Fight Club" className="card" onClick={() => navigate("/movies/8")}></img></div>
                <div className="card"><img src="https://wallpapercave.com/wp/wp4627605.jpg" alt="Dangal" className="card" onClick={() => navigate("/movies/9")}></img></div>
                <div className="card"><img src="https://wallpapercave.com/wp/wp7050029.jpg" alt="Mulshi Pattern" className="card" onClick={() => navigate("/movies/19")}></img></div>
              </div>
            </div>
            <div className="row">
              <h2>Latest Movies</h2>
              <div className="row-cards">
                <div className="card"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT53oVqNeFPUzl35_sDApF8xoZ0ElHETSvsnw&s" alt="Dashavtar" className="card" onClick={() => navigate("/movies/10")}></img></div>
                <div className="card"><img src="https://wallpapercave.com/wp/wp15992879.jpg" alt="Dhurandhar" className="card" onClick={() => navigate("/movies/11")}></img></div>
                <div className="card"><img src="https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg" alt="Oppenheimer" className="card" onClick={() => navigate("/movies/12")}></img></div>
                <div className="card"><img src="https://resizing.flixster.com/7Khg08DHMRQ6HvF0VypOcCYpWH8=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2RhNmIxMzE2LWU4YmMtNGQ5Zi05NmNiLWJmMzEyY2Q4MTA3Yy5qcGc=" alt="Dev Manus" className="card" onClick={() => navigate("/movies/13")}></img></div>
                <div className="card"><img src="https://wallpapercave.com/wp/wp15066594.webp" alt="Chhavaa" className="card" onClick={() => navigate("/movies/14")}></img></div>
                <div className="card"><img src="https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg" alt="John Wick: Chapter 4" className="card" onClick={() => navigate("/movies/15")}></img></div>
                <div className="card"><img src="https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/jarann-et00446492-1747488540.jpg" alt="Jarann" className="card" onClick={() => navigate("/movies/16")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/War_2_official_poster.jpg/250px-War_2_official_poster.jpg" alt="War 2" className="card" onClick={() => navigate("/movies/17")}></img></div>
                <div className="card"><img src="https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg" alt="Mission Impossible" className="card" onClick={() => navigate("/movies/18")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Gulkand_film.jpg/250px-Gulkand_film.jpg" alt="Gulkand" className="card" onClick={() => navigate("/movies/20")}></img></div>
              </div>
            </div>
            <div className="row">
              <h2>English movies</h2>
              <div className="row-cards">
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/The_Dark_Knight_%282008_film%29.jpg/250px-The_Dark_Knight_%282008_film%29.jpg" alt="The Dark Knight" className="card" onClick={() => navigate("/movies/21")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg" alt="Interstellar" className="card" onClick={() => navigate("/movies/22")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg" alt="Inception" className="card" onClick={() => navigate("/movies/23")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Scarface_-_1983_film.jpg/250px-Scarface_-_1983_film.jpg" alt="Scarface" className="card" onClick={() => navigate("/movies/24")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg" alt="Avengers : Endgame" className="card" onClick={() => navigate("/movies/25")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/4/4f/Poster_-_Fast_and_Furious_Tokyo_Drift.jpg" alt="Fast &Furious Tokyo Drift" className="card" onClick={() => navigate("/movies/26")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Men_In_Black_3.jpg/250px-Men_In_Black_3.jpg" alt="Men In Black 3" className="card" onClick={() => navigate("/movies/27")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Cars_2_Poster.jpg/250px-Cars_2_Poster.jpg" alt="Cars 2" className="card" onClick={() => navigate("/movies/28")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/8/8e/Baby_Driver_poster.jpg" alt="Baby Driver" className="card" onClick={() => navigate("/movies/29")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Ford_v._Ferrari_%282019_film_poster%29.png" alt="Ford v Ferrari" className="card" onClick={() => navigate("/movies/30")}></img></div>
              </div>
            </div>
            <div className="row">
              <h2>Hindi Movies</h2>
              <div className="row-cards">
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Singham_%282011_Hindi_film%29_Theatrical_poster.jpg/250px-Singham_%282011_Hindi_film%29_Theatrical_poster.jpg" alt="Singham" className="card" onClick={() => navigate("/movies/31")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/The_Kashmir_Files_poster.jpg/250px-The_Kashmir_Files_poster.jpg" alt="The Kashmir Files" className="card" onClick={() => navigate("/movies/32")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Golmaal_3.jpg/250px-Golmaal_3.jpg" alt="Golmaal 3" className="card" onClick={() => navigate("/movies/33")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Still-phir-hera-phir.jpg/250px-Still-phir-hera-phir.jpg" alt="Phir Hera Pheri" className="card" onClick={() => navigate("/movies/34")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Dedanadan.jpg/250px-Dedanadan.jpg" alt="De Dana Dan" className="card" onClick={() => navigate("/movies/35")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Dhamaal_2007.jpg/250px-Dhamaal_2007.jpg" alt="Dhamaal" className="card" onClick={() => navigate("/movies/36")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/URI_-_New_poster.jpg/250px-URI_-_New_poster.jpg" alt="Uri: The Surgical Strike" className="card" onClick={() => navigate("/movies/37")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Zindagi_Na_Milegi_Dobara.jpg/250px-Zindagi_Na_Milegi_Dobara.jpg" alt="Zindagi Na Milegi Dobara" className="card" onClick={() => navigate("/movies/38")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Tumbbad_poster.jpg/250px-Tumbbad_poster.jpg" alt="Tumbaad" className="card" onClick={() => navigate("/movies/39")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Swatantrya_Veer_Savarkar.jpg/250px-Swatantrya_Veer_Savarkar.jpg" alt="Swatantrya Veer Savarkar" className="card" onClick={() => navigate("/movies/40")}></img></div>
              </div>
            </div><div className="row">
              <h2>Marathi movies</h2>
              <div className="row-cards">
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Pawankhind_film.jpg/250px-Pawankhind_film.jpg" alt="PawanKhind" className="card" onClick={() => navigate("/movies/41")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Mumbai-Pune-Mumbai.jpg/250px-Mumbai-Pune-Mumbai.jpg" alt="Mumbai-Pune-Mumbai" className="card" onClick={() => navigate("/movies/42")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Ashi_Hi_Banwa_Banwi.jpg/250px-Ashi_Hi_Banwa_Banwi.jpg" alt="Ashi hi Banwa Banwi" className="card" onClick={() => navigate("/movies/43")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Zapatlela_1.jpg/250px-Zapatlela_1.jpg" alt="Zapatlela" className="card" onClick={() => navigate("/movies/44")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/1/13/Dharmaveer_Marathi_film.jpeg" alt="Dharmaveer" className="card" onClick={() => navigate("/movies/45")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Juna_Furniture.jpg/250px-Juna_Furniture.jpg" alt="Juna Furniture" className="card" onClick={() => navigate("/movies/46")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Katyar_Kaljat_Ghusali_%28film%29.jpg/250px-Katyar_Kaljat_Ghusali_%28film%29.jpg" alt="Katyar Kaljat Ghusali" className="card" onClick={() => navigate("/movies/47")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Ventilator_Poster.jpg/250px-Ventilator_Poster.jpg" alt="Vantilator" className="card" onClick={() => navigate("/movies/48")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Dr._Prakash_Baba_Amte_%E2%80%93_The_Real_Hero_%282014_film%29_poster.jpg/250px-Dr._Prakash_Baba_Amte_%E2%80%93_The_Real_Hero_%282014_film%29_poster.jpg" alt="Dr. Prakash Baba Amte" className="card" onClick={() => navigate("/movies/49")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Gulabjaam.jpg/250px-Gulabjaam.jpg" alt="Gulabjaam" className="card" onClick={() => navigate("/movies/50")}></img></div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Movies;
