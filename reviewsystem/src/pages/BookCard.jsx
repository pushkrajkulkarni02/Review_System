import { useNavigate } from "react-router-dom";

export default function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <img
      src={book.poster}
      className="book-poster"
      onClick={() => navigate(`/book/${book.id}`)}
      alt={book.title}
    />
  );
}
