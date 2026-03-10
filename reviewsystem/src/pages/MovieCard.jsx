import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <img
      src={movie.poster}
      className="movie-poster"
      onClick={() => navigate(`/movie/${movie.id}`)}
      alt={movie.title}
    />
  );
}
