console.log("Server file started...");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",    
  user: "root",
  password: "root",
  database: "review_system"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Register API
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashed], (err, result) => {
    if (err) return res.json({ status: "error", message: err });
    return res.json({ status: "success" });
  });
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return res.json({ status: "error" });

    if (result.length === 0) {
      return res.json({ status: "invalid" });
    }

    const user = result[0];
    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
      return res.json({ status: "invalid" });
    }

    return res.json({ status: "success" });
  });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
// const mysql = require("mysql2");
// const db = mysql.createConnection({ ... });
// db.connect(...)
