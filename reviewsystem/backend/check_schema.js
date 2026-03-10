
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "review_system"
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    db.query("DESCRIBE users", (err, result) => {
        if (err) throw err;
        console.log(result);
        process.exit();
    });
});
