import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Books.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Books() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/books");
        setAllBooks(res.data);
      } catch (err) {
        console.error("Error fetching books", err);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredBooks([]);
    } else {
      const results = allBooks.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBooks(results);
    }
  }, [search, allBooks]);

  return (
    <>
      <Navbar />
      <div className="page-container">

        {/* Search Bar */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search for a book..."
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
            {filteredBooks.length > 0 ? (
              <div className="row-cards" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
                {filteredBooks.map(book => (
                  <div key={book.id} className="card">
                    <img
                      src={book.poster}
                      alt={book.title}
                      className="card"
                      onClick={() => navigate(`/books/${book.id}`)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h2>Book not found</h2>
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
              + Add Book
            </button>
          </div>
        )}

        {/* Only show default categories if not searching */}
        {search.trim() === "" && (
          <>
            <div className="row">
              <h2>Top Rated Books</h2>
              <div className="row-cards">
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WordsOfRadianceCover.png/250px-WordsOfRadianceCover.png" alt="Words of Radiance" className="card" onClick={() => navigate("/books/1")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Harry_Potter_and_the_Deathly_Hallows.jpg/250px-Harry_Potter_and_the_Deathly_Hallows.jpg" alt="Harry Potter and The Deathly Hollows" className="card" onClick={() => navigate("/books/2")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Fourth_Wing_Cover_Art.jpeg/250px-Fourth_Wing_Cover_Art.jpeg" alt="Fourth Wing" className="card" onClick={() => navigate("/books/3")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Mrityunjay-tv_serial.png/250px-Mrityunjay-tv_serial.png" alt="Mrutyunjay" className="card" onClick={() => navigate("/books/4")}></img></div>
                <div className="card"><img src="https://cdn.exoticindia.com/images/products/original/books-2019/qzz217b.jpg" alt="Shyam chi Aai" className="card" onClick={() => navigate("/books/5")}></img></div>
                <div className="card"><img src="https://rekhtabooks.com/cdn/shop/files/Batatychi-Chawl.jpg?v=1727351766" alt="Batatyachi Chaal" className="card" onClick={() => navigate("/books/6")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Godaan_by_Munshi_Premchand.png/250px-Godaan_by_Munshi_Premchand.png" alt="Godan" className="card" onClick={() => navigate("/books/7")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/7/70/Nirmala_novel_cover.jpg" alt="Nirmala" className="card" onClick={() => navigate("/books/8")}></img></div>
                <div className="card"><img src="https://www.surjeetpublications.com/image/cache/data/surjeet/product/update-june2018/Raag-Darbari-228x334.jpg" alt="Raag Darbari" className="card" onClick={() => navigate("/books/9")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1567612158l/50196744.jpg" alt="Know My Name" className="card" onClick={() => navigate("/books/10")}></img></div>
              </div>
            </div>

            <div className="row">
              <h2>English books</h2>
              <div className="row-cards">
                <div className="card"><img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1456172607i/22299763.jpg" alt="Crooked Kingdom" className="card" onClick={() => navigate("/books/11")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1620325671i/50659468.jpg" alt="A Court of Mist and Fury" className="card" onClick={() => navigate("/books/12")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1654216226i/61215384.jpg" alt="The Return of the King" className="card" onClick={() => navigate("/books/13")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1464201430i/12127810.jpg" alt="The House of Hades" className="card" onClick={() => navigate("/books/14")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1673567331i/76715522.jpg" alt="Kingdom of Ash" className="card" onClick={() => navigate("/books/15")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1681839850i/21853621.jpg" alt="The Nightingale" className="card" onClick={() => navigate("/books/16")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1667655583i/29227774.jpg" alt="Light Bringer" className="card" onClick={() => navigate("/books/17")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1327354180i/15195.jpg" alt="The Complete Maus" className="card" onClick={() => navigate("/books/18")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1640745736i/56060300.jpg" alt="Heartstopper: Volume Four" className="card" onClick={() => navigate("/books/19")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1635827409i/20342617.jpg" alt="Just Mercy" className="card" onClick={() => navigate("/books/20")}></img></div>
              </div>
            </div>

            <div className="row">
              <h2>Marathi Books</h2>
              <div className="row-cards">
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Yayati_English_translation_cover.jpeg/250px-Yayati_English_translation_cover.jpeg" alt="Yayati" className="card" onClick={() => navigate("/books/21")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Cocoon_Bhalchandra_Nemade.jpeg/250px-Cocoon_Bhalchandra_Nemade.jpeg" alt="Kosala" className="card" onClick={() => navigate("/books/22")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/3/35/Front_cover_-_Rau_%28marathi_novel%29_1972.jpg" alt="Rau" className="card" onClick={() => navigate("/books/23")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Pan_Lakshat_Kon_Gheto_cover.jpg/250px-Pan_Lakshat_Kon_Gheto_cover.jpg" alt="Pan Lakshat Kon Gheto" className="card" onClick={() => navigate("/books/24")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/9/92/Mahanayak_%28novel%29.jpg" alt="Mahanayak" className="card" onClick={() => navigate("/books/25")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/I/31UuT0c8dyL._FMwebp_.jpg" alt="Duniyadari" className="card" onClick={() => navigate("/books/26")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/I/41x2pSSCV1L._SX342_SY445_FMwebp_.jpg" alt="Ek Hota Carver" className="card" onClick={() => navigate("/books/27")}></img></div>
                <div className="card"><img src="https://www.gutenberg.org/cache/epub/24827/pg24827.cover.medium.jpg" alt="Rita Welinkar" className="card" onClick={() => navigate("/books/28")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/I/412XP5YMjqL._SX342_SY445_FMwebp_.jpg" alt="bangerwadi" className="card" onClick={() => navigate("/books/29")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/I/31GToS4D9+L.jpg" alt="Asa Mi Asami" className="card" onClick={() => navigate("/books/30")}></img></div>
              </div>
            </div>

            <div className="row">
              <h2>Hindi books</h2>
              <div className="row-cards">
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/c/c5/Gaban_%28novel%29.jpg" alt="Gaban" className="card" onClick={() => navigate("/booksm/31")}></img></div>
                <div className="card"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJCXdhLVZ08fzhwITg27MiwgRn4WtF54ca8Q&s" alt="Rashmirathi" className="card" onClick={() => navigate("/books/32")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Madhushala.jpg/250px-Madhushala.jpg" alt="Madhushala" className="card" onClick={() => navigate("/books/33")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/I/41zAs+uVE6L._SY445_SX342_FMwebp_.jpg" alt="Gunaho Ka Devta" className="card" onClick={() => navigate("/books/34")}></img></div>
                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Maila_anchal_Front.jpg/250px-Maila_anchal_Front.jpg" alt="Maila Anchal" className="card" onClick={() => navigate("/books/35")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/I/81cXchJoVFL._SY466_.jpg" alt="Kamayani" className="card" onClick={() => navigate("/books/36")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/I/81faMT-cnzL._SY466_.jpg" alt="Tamas" className="card" onClick={() => navigate("/books/37")}></img></div>
                <div className="card"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3XDMsqJOBaOuNkZbJGUL-rR0oxAqvQiDxDQ&s" alt="Chandrakanta" className="card" onClick={() => navigate("/books/38")}></img></div>
                <div className="card"><img src="https://m.media-amazon.com/images/I/61gcYLDVXcL._SY466_.jpg" alt="Parineeta" className="card" onClick={() => navigate("/books/39")}></img></div>
                <div className="card"><img src="https://cdn.kobo.com/book-images/0ce396b1-335a-4313-aa36-5f6f534c7143/1200/1200/False/zindaginama.jpg" alt="Zindaginama" className="card" onClick={() => navigate("/books/40")}></img></div>
              </div>
            </div>
          </>
        )}

      </div>
    </>
  );
}

export default Books;


