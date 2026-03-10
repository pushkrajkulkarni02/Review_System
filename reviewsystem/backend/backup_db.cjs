const mysql = require("mysql2/promise");
const fs = require("fs");

/* ---------------- DB CONFIG ---------------- */
const config = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "review_system"
};

(async () => {
    try {
        console.log("Connecting to database...");
        const db = await mysql.createConnection(config);
        console.log("Connected.");

        let output = "";

        // 1. Get Tables
        const [tables] = await db.query("SHOW TABLES");
        const tableNames = tables.map(row => Object.values(row)[0]);

        for (const tableName of tableNames) {
            console.log(`Processing table: ${tableName}`);
            output += `\n/* Table: ${tableName} */\n`;

            // 2. Create Table Schema
            const [createTableResult] = await db.query(`SHOW CREATE TABLE \`${tableName}\``);
            output += `DROP TABLE IF EXISTS \`${tableName}\`;\n`;
            output += `${createTableResult[0]['Create Table']};\n`;

            // 3. Insert Data
            const [rows] = await db.query(`SELECT * FROM \`${tableName}\``);
            if (rows.length > 0) {
                const values = rows.map(row => {
                    return `(${Object.values(row).map(val => db.escape(val)).join(", ")})`;
                }).join(",\n");

                // Assuming INSERT statements can be large, we might want to split them, but for this project OK.
                // However, we need column names ideally.
                // Let's get column names from first row or describe table.
                // Actually, INSERT INTO table VALUES (...) works if we match column order, which SELECT * preserves.

                output += `INSERT INTO \`${tableName}\` VALUES\n${values};\n\n`;
            } else {
                output += `\n`;
            }
        }

        fs.writeFileSync("db_backup.sql", output);
        console.log("\nBackup saved to 'db_backup.sql'");

        await db.end();
    } catch (err) {
        console.error("Backup failed:", err);
    }
})();
