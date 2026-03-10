
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "review_system"
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected. Updating schema...");

    const queries = [
        "ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user'",
        "ALTER TABLE movies ADD COLUMN description TEXT",
        "ALTER TABLE movies ADD COLUMN cast TEXT",
        "ALTER TABLE books ADD COLUMN description TEXT"
    ];

    let completed = 0;
    queries.forEach(query => {
        db.query(query, (err) => {
            if (err) {
                // Ignore "Duplicate column name" error (code 1060)
                if (err.code !== 'ER_DUP_FIELDNAME') {
                    console.error("Error running query:", query, err.message);
                } else {
                    console.log("Column already exists for query:", query);
                }
            } else {
                console.log("Success:", query);
            }
            completed++;
            if (completed === queries.length) {
                console.log("All updates attempted.");
                process.exit();
            }
        });
    });
});
