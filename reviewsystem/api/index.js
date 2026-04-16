import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/* ---------------- REGISTER ---------------- */
app.post("/api/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.json({ status: "error", message: "All fields required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const userRole = role || "user";
  const userStatus = userRole === "admin" ? "pending" : "active";

  const { data: existingUser, error: checkErr } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    return res.json({ status: "error", message: "User already exists" });
  }

  const { error: insertErr } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassword, role: userRole, status: userStatus }]);

  if (insertErr) {
    console.error(insertErr);
    return res.json({ status: "error", message: "Error registering user" });
  }

  if (userRole === "admin") {
    // Log the admin request for main_admin to see
    const { error: reqErr } = await supabase
      .from("role_requests")
      .insert([{ name, email, role: userRole }]);
    if (reqErr) console.error("Error creating role request:", reqErr);
    return res.json({ status: "pending", message: "Admin registration requested! Waiting for approval." });
  }

  res.json({ status: "success" });
});

/* ---------------- LOGIN ---------------- */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return res.json({ status: "invalid" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return res.json({ status: "invalid" });
  }

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

/* ---------------- MOVIES LIST ---------------- */
app.get("/api/movies", async (req, res) => {
  const { data, error } = await supabase.from("movies").select("*");
  if (error) return res.json([]);
  res.json(data);
});

/* ---------------- MOVIE DETAILS ---------------- */
app.get("/api/movies/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", req.params.id)
    .single();
    
  if (error || !data) return res.status(404).json({ message: "Movie not found" });
  res.json(data);
});

/* ---------------- MOVIE REVIEWS ---------------- */
app.get("/api/movies/:id/reviews", async (req, res) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("movie_id", req.params.id);
  if (error) return res.status(500).json({ status: "error", message: error.message });
  res.json(data);
});

app.post("/api/movies/:id/reviews", async (req, res) => {
  const { user_name, rating, review } = req.body;
  if (!user_name || !rating || !review) return res.status(400).json({ status: "error", message: "All fields required" });

  const { error } = await supabase
    .from("reviews")
    .insert([{ movie_id: parseInt(req.params.id), user_name, rating: parseInt(rating), review }]);
    
  if (error) return res.status(500).json({ status: "error", message: error.message });
  res.json({ status: "success" });
});

/* ---------------- DELETE REVIEW (Movies) ---------------- */
app.delete("/api/reviews/:id", async (req, res) => {
  const { error } = await supabase.from("reviews").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ status: "error", message: error.message });
  res.json({ status: "success" });
});

/* ---------------- BOOKS LIST ---------------- */
app.get("/api/books", async (req, res) => {
  const { data, error } = await supabase.from("books").select("*");
  if (error) return res.json([]);
  res.json(data);
});

/* ---------------- BOOK DETAILS ---------------- */
app.get("/api/books/:id", async (req, res) => {
  const { data, error } = await supabase.from("books").select("*").eq("id", req.params.id).single();
  if (error || !data) return res.status(404).json({ message: "Book not found" });
  res.json(data);
});

/* ---------------- BOOK REVIEWS ---------------- */
app.get("/api/books/:id/reviews", async (req, res) => {
  const { data, error } = await supabase.from("book_reviews").select("*").eq("book_id", req.params.id);
  if (error) return res.status(500).json({ status: "error", message: error.message });
  res.json(data);
});

app.post("/api/books/:id/reviews", async (req, res) => {
  const { user_name, rating, review } = req.body;
  if (!user_name || !rating || !review) return res.status(400).json({ status: "error", message: "All fields required" });

  const { error } = await supabase
    .from("book_reviews")
    .insert([{ book_id: parseInt(req.params.id), user_name, rating: parseInt(rating), review }]);

  if (error) return res.status(500).json({ status: "error", message: error.message });
  res.json({ status: "success" });
});

app.delete("/api/book-reviews/:id", async (req, res) => {
  const { error } = await supabase.from("book_reviews").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ status: "error", message: error.message });
  res.json({ status: "success" });
});

/* ---------------- TV SERIES LIST ---------------- */
app.get("/api/tvseries", async (req, res) => {
  const { data, error } = await supabase.from("tvseries").select("*");
  if (error) return res.json([]);
  res.json(data);
});

/* ---------------- TV SERIES DETAILS ---------------- */
app.get("/api/tvseries/:id", async (req, res) => {
  const { data, error } = await supabase.from("tvseries").select("*").eq("id", req.params.id).single();
  if (error || !data) return res.status(404).json({ message: "TV Series not found" });
  res.json(data);
});

/* ---------------- TV SERIES REVIEWS ---------------- */
app.get("/api/tvseries/:id/reviews", async (req, res) => {
  const { data, error } = await supabase.from("tvseries_reviews").select("*").eq("tvseries_id", req.params.id);
  if (error) return res.status(500).json({ status: "error", message: error.message });
  res.json(data);
});

app.post("/api/tvseries/:id/reviews", async (req, res) => {
  const { user_name, rating, review } = req.body;
  if (!user_name || !rating || !review) return res.status(400).json({ status: "error", message: "All fields required" });

  const { error } = await supabase
    .from("tvseries_reviews")
    .insert([{ tvseries_id: parseInt(req.params.id), user_name, rating: parseInt(rating), review }]);

  if (error) return res.status(500).json({ status: "error", message: error.message });
  res.json({ status: "success" });
});

app.delete("/api/tvseries-reviews/:id", async (req, res) => {
  const { error } = await supabase.from("tvseries_reviews").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ status: "error", message: error.message });
  res.json({ status: "success" });
});

/* ---------------- ADD CONTENT ---------------- */
app.post("/api/add-movie", async (req, res) => {
  const { title, description, poster, cast_members } = req.body;
  if (!title || !description || !poster || !cast_members) return res.json({ status: "error", message: "Missing fields" });

  const { error } = await supabase
    .from("movies")
    .insert([{ title, description, poster, cast_members }]);
  if (error) return res.json({ status: "error", message: error.message });
  res.json({ status: "success" });
});

app.post("/api/add-book", async (req, res) => {
  const { title, description, poster, author } = req.body;
  if (!title || !description || !poster || !author) return res.json({ status: "error", message: "Missing fields" });

  const { error } = await supabase
    .from("books")
    .insert([{ title, description, poster, author }]);
  if (error) return res.json({ status: "error", message: error.message });
  res.json({ status: "success" });
});

app.post("/api/add-tvseries", async (req, res) => {
  const { title, description, poster, cast_members } = req.body;
  if (!title || !description || !poster) return res.json({ status: "error", message: "Missing fields" });

  const { error } = await supabase
    .from("tvseries")
    .insert([{ title, description, poster, cast_members }]);
  if (error) return res.json({ status: "error", message: error.message });
  res.json({ status: "success" });
});

/* ---------------- ADMIN APPROVAL ---------------- */
app.get("/api/admin/role-requests", async (req, res) => {
  const { data, error } = await supabase.from("role_requests").select("*").eq("status", "pending");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/api/admin/approve-request", async (req, res) => {
  const { email, action } = req.body;

  if (action === "approve") {
    await supabase.from("users").update({ status: "active" }).eq("email", email);
    await supabase.from("role_requests").update({ status: "approved" }).eq("email", email);
    res.json({ status: "success", message: "Admin approved!" });
  } else {
    await supabase.from("role_requests").update({ status: "rejected" }).eq("email", email);
    res.json({ status: "success", message: "Request rejected" });
  }
});

// For local testing
import { fileURLToPath } from 'url';
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
