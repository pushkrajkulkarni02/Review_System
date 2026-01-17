import { useState } from "react";
import Navbar from "./Navbar";
import "./Books.css";

const booksList = [
  "Harry Potter",
  "Atomic Habits",
  "Rich Dad Poor Dad",
  "The Alchemist",
  "Think and Grow Rich"
];

function Books() {
  const [search, setSearch] = useState("");

  const filteredBooks = booksList.filter(book =>
    book.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>Search Books</h2>

        <input
          type="text"
          placeholder="Search book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ul>
          {filteredBooks.map((book, index) => (
            <li key={index}>{book}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Books;
