import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Books from "./pages/Books";
import TvSeries from "./pages/TvSeries";
import Profile from "./pages/Profile";
import MovieDetails from "./pages/MovieDetails";
import BookDetails from "./pages/BookDetails";
import TvSeriesDetails from "./pages/TvSeriesDetails";
import AddContent from "./pages/AddContent";
import { ToastContainer } from "./components/Toast";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/books" element={<Books />} />
          <Route path="/tvseries" element={<TvSeries />} />
          <Route path="/add-content" element={<AddContent />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/tvseries/:id" element={<TvSeriesDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
