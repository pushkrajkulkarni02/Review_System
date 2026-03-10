
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "review_system"
});

db.connect((err) => {
    if (err) {
        console.error("DB Connection Error:", err);
        process.exit(1);
    }
    console.log("Connected to DB");

    const tables = ["users", "movies", "books"];

    let checked = 0;
    tables.forEach(table => {
        db.query(`DESCRIBE ${table}`, (err, result) => {
            if (err) console.error(`Error describing ${table}:`, err);
            else {
                console.log(`\nTable: ${table}`);
                console.log(result.map(col => `${col.Field} (${col.Type})`).join(", "));
            }
            checked++;
            if (checked === tables.length) process.exit();
        });
    });
});
