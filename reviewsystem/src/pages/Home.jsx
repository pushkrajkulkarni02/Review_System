import Navbar from "./Navbar";
import "./Home.css";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="home">
        <h1>Welcome to Review System</h1>
        <p>You have successfully logged in.</p>

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
            <div className="more-card" onClick={() => navigate("/movies")}><h1>+</h1></div>
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
            <div className="card"><img src="https://upload.wikimedia.org/wikipedia/hi/f/f5/War_2_official_poster.jpg?20250520063337" alt="War 2" className="card" onClick={() => navigate("/movies/17")}></img></div>
            <div className="card"><img src="https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg" alt="Mission Impossible" className="card" onClick={() => navigate("/movies/18")}></img></div>
            <div className="more-card" onClick={() => navigate("/movies")}><h1>+</h1></div>
          </div>
        </div>

        <div className="row">
          <h2>Top Rated Books</h2>
          <div className="row-cards">
            <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WordsOfRadianceCover.png/250px-WordsOfRadianceCover.png" alt="Words of Radiance" className="card" onClick={() => navigate("/books/1")}></img></div>
            <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Harry_Potter_and_the_Deathly_Hallows.jpg/250px-Harry_Potter_and_the_Deathly_Hallows.jpg" alt="Harry Potter and The Deathly Hollows" className="card" onClick={() => navigate("/books/2")}></img></div>
            <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Fourth_Wing_Cover_Art.jpeg/250px-Fourth_Wing_Cover_Art.jpeg" alt="Fourth Wing" className="card" onClick={() => navigate("/books/3")}></img></div>
            <div className="card"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Mrityunjay-tv_serial.png/250px-Mrityunjay-tv_serial.png" alt="Mrutyunjay" className="card" onClick={() => navigate("/books/4")}></img></div>
            <div className="card"><img src="https://cdn.exoticindia.com/images/products/original/books-2019/qzz217b.jpg" alt="Shyam chi Aai" className="card" onClick={() => navigate("/books/5")}></img></div>
            <div className="card"><img src="https://rekhtabooks.com/cdn/shop/files/Batatychi-Chawl.jpg?v=1727351766" alt="Batatyachi Chaal" className="card" onClick={() => navigate("/books/6")}></img></div>
            <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Godaan_by_Munshi_Premchand.png/250px-Godaan_by_Munshi_Premchand.png" alt="Munshi Premchand" className="card" onClick={() => navigate("/books/7")}></img></div>
            <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/7/70/Nirmala_novel_cover.jpg" alt="Nirmala" className="card" onClick={() => navigate("/books/8")}></img></div>
            <div className="card"><img src="https://www.surjeetpublications.com/image/cache/data/surjeet/product/update-june2018/Raag-Darbari-228x334.jpg" alt="Raag Darbari" className="card" onClick={() => navigate("/books/9")}></img></div>
            <div className="more-card" onClick={() => navigate("/books")}><h1>+</h1></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
