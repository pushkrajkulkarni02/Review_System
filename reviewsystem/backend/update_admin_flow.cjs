
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "review_system"
});

db.connect((err) => {
    if (err) {
        console.error("DB connection failed:", err);
        process.exit(1);
    }
    console.log("Connected. Updating schema for admin approval...");

    const queries = [
        "ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active'"
    ];

    let completed = 0;
    queries.forEach(query => {
        db.query(query, (err) => {
            if (err) {
                if (err.code !== 'ER_DUP_FIELDNAME') {
                    console.error("Error running query:", query, err.message);
                } else {
                    console.log("Column already exists:", query);
                }
            } else {
                console.log("Success:", query);
            }
            completed++;
            if (completed === queries.length) {
                console.log("All updates attempted.");

                // Set first admin as main_admin if exists, or just set my test user
                const setMainAdminSql = "UPDATE users SET role = 'main_admin' WHERE role = 'admin' LIMIT 1";
                db.query(setMainAdminSql, (err) => {
                    if (err) console.error("Error setting main_admin:", err);
                    else console.log("First admin (if any) promoted to main_admin for testing.");
                    process.exit();
                });
            }
        });
    });
});
