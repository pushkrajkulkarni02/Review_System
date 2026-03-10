const dotenv = require("dotenv");
dotenv.config();

console.log("Server starting...");

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- DB CONNECTION ---------------- */
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "review_system"
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("MySQL Connected");
});

/* ---------------- REGISTER ---------------- */
app.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.json({ status: "error", message: "All fields required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const userRole = role || "user";

  // If role is admin, set status to pending by default (approval needed)
  const userStatus = userRole === "admin" ? "pending" : "active";

  const sql =
    "INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, email, hashedPassword, userRole, userStatus], (err) => {
    if (err) {
      console.error(err);
      return res.json({ status: "error", message: "User already exists or error" });
    }

    if (userRole === "admin") {
      // Log the admin request for main_admin to see
      const requestSql = "INSERT INTO role_requests (name, email, role) VALUES (?, ?, ?)";
      db.query(requestSql, [name, email, userRole], (reqErr) => {
        if (reqErr) console.error("Error creating role request:", reqErr);
      });
      return res.json({ status: "pending", message: "Admin registration requested! Waiting for approval." });
    }

    res.json({ status: "success" });
  });
});

/* ---------------- LOGIN ---------------- */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return res.json({ status: "error" });

    if (result.length === 0) {
      return res.json({ status: "invalid" });
    }

    const user = result[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.json({ status: "invalid" });
    }

    // Check if user is active (approved)
    if (user.role === "admin" && user.status !== "active") {
      return res.json({ status: "pending", message: "Your admin account is still pending approval." });
    }

    res.json({
      status: "success",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
});

/* ---------------- MOVIES LIST ---------------- */
app.get("/movies", (req, res) => {
  const sql = "SELECT * FROM movies";

  db.query(sql, (err, result) => {
    if (err) {
      return res.json([]);
    }
    res.json(result);
  });
});

/* ---------------- MOVIE DETAILS (FIXED) ---------------- */
app.get("/movies/:id", (req, res) => {
  const movieId = req.params.id;

  const sql = "SELECT * FROM movies WHERE id = ?";

  db.query(sql, [movieId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(result[0]);
  });
});

/* ---------------- MOVIE REVIEWS ---------------- */

// Get reviews of a movie
app.get("/movies/:id/reviews", (req, res) => {
  const movieId = req.params.id;

  const sql =
    "SELECT * FROM reviews WHERE movie_id = ?";

  db.query(sql, [movieId], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: err.message });
    }

    res.json(result);
  });
});

// Add review to a movie
app.post("/movies/:id/reviews", (req, res) => {
  const movieId = req.params.id;
  const { user_name, rating, review } = req.body;

  if (!user_name || !rating || !review) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields required" });
  }

  const sql =
    "INSERT INTO reviews (movie_id, user_name, rating, review) VALUES (?, ?, ?, ?)";

  db.query(sql, [movieId, user_name, rating, review], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: err.message });
    }

    res.json({ status: "success" });
  });
});

/* ---------------- DELETE REVIEW ---------------- */
app.delete("/reviews/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM reviews WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: err.message });
    }
    res.json({ status: "success" });
  });
});

/* ---------------- BOOKS LIST ---------------- */
app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  db.query(sql, (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
});

/* ---------------- BOOK DETAILS ---------------- */
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const sql = "SELECT * FROM books WHERE id = ?";

  db.query(sql, [bookId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(result[0]);
  });
});

/* ---------------- BOOK REVIEWS ---------------- */
app.get("/books/:id/reviews", (req, res) => {
  const bookId = req.params.id;

  const sql = "SELECT * FROM book_reviews WHERE book_id = ?";

  db.query(sql, [bookId], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: err.message });
    }

    res.json(result);
  });
});

app.post("/books/:id/reviews", (req, res) => {
  const bookId = req.params.id;
  const { user_name, rating, review } = req.body;

  if (!user_name || !rating || !review) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields required" });
  }

  const sql = "INSERT INTO book_reviews (book_id, user_name, rating, review) VALUES (?, ?, ?, ?)";

  db.query(sql, [bookId, user_name, rating, review], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Error adding review" });
    }

    res.json({ status: "success" });
  });
});

app.delete("/book-reviews/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM book_reviews WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: err.message });
    }
    res.json({ status: "success" });
  });
});

/* ---------------- TV SERIES LIST ---------------- */
app.get("/tvseries", (req, res) => {
  const sql = "SELECT * FROM tvseries";

  db.query(sql, (err, result) => {
    if (err) {
      return res.json([]);
    }
    res.json(result);
  });
});

/* ---------------- TV SERIES DETAILS ---------------- */
app.get("/tvseries/:id", (req, res) => {
  const seriesId = req.params.id;

  const sql = "SELECT * FROM tvseries WHERE id = ?";

  db.query(sql, [seriesId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "TV Series not found" });
    }

    res.json(result[0]);
  });
});

/* ---------------- TV SERIES REVIEWS ---------------- */

// Get reviews of a TV series
app.get("/tvseries/:id/reviews", (req, res) => {
  const seriesId = req.params.id;

  const sql = "SELECT * FROM tvseries_reviews WHERE tvseries_id = ?";

  db.query(sql, [seriesId], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: err.message });
    }

    res.json(result);
  });
});

// Add review to a TV series
app.post("/tvseries/:id/reviews", (req, res) => {
  const seriesId = req.params.id;
  const { user_name, rating, review } = req.body;

  if (!user_name || !rating || !review) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields required" });
  }

  const sql =
    "INSERT INTO tvseries_reviews (tvseries_id, user_name, rating, review) VALUES (?, ?, ?, ?)";

  db.query(sql, [seriesId, user_name, rating, review], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: err.message });
    }

    res.json({ status: "success" });
  });
});

// Delete TV series review
app.delete("/tvseries-reviews/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM tvseries_reviews WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: err.message });
    }
    res.json({ status: "success" });
  });
});

/* ---------------- ADD CONTENT ---------------- */
app.post("/add-movie", (req, res) => {
  const { title, description, poster, cast_members } = req.body;
  if (!title || !description || !poster || !cast_members) {
    return res.json({ status: "error", message: "Missing fields" });
  }
  const sql = "INSERT INTO movies (title, description, poster, cast_members) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, poster, cast_members], (err) => {
    if (err) return res.json({ status: "error", message: err.message });
    res.json({ status: "success" });
  });
});

app.post("/add-book", (req, res) => {
  const { title, description, poster, author } = req.body;
  if (!title || !description || !poster || !author) {
    return res.json({ status: "error", message: "Missing fields" });
  }
  const sql = "INSERT INTO books (title, description, poster, author) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, poster, author], (err) => {
    if (err) return res.json({ status: "error", message: err.message });
    res.json({ status: "success" });
  });
});

app.post("/add-tvseries", (req, res) => {
  const { title, description, poster, cast_members } = req.body;
  if (!title || !description || !poster) {
    return res.json({ status: "error", message: "Missing fields" });
  }
  const sql = "INSERT INTO tvseries (title, description, poster, cast) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, poster, cast_members], (err) => {
    if (err) return res.json({ status: "error", message: err.message });
    res.json({ status: "success" });
  });
});

/* ---------------- ADMIN APPROVAL (NEW) ---------------- */

// Get pending admin requests
app.get("/admin/role-requests", (req, res) => {
  const sql = "SELECT * FROM role_requests WHERE status = 'pending'";
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Approve/Reject admin request
app.post("/admin/approve-request", (req, res) => {
  const { email, action } = req.body; // action: 'approve' or 'reject'

  if (action === "approve") {
    const updateStatusSql = "UPDATE users SET status = 'active' WHERE email = ?";
    db.query(updateStatusSql, [email], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      const updateReqSql = "UPDATE role_requests SET status = 'approved' WHERE email = ?";
      db.query(updateReqSql, [email], () => { });

      res.json({ status: "success", message: "Admin approved!" });
    });
  } else {
    const updateReqSql = "UPDATE role_requests SET status = 'rejected' WHERE email = ?";
    db.query(updateReqSql, [email], () => {
      res.json({ status: "success", message: "Request rejected" });
    });
  }
});

/* ---------------- SERVER ---------------- */
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});
