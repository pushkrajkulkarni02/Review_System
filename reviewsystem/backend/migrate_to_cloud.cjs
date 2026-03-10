const mysql = require("mysql2/promise");
const fs = require("fs");

/* ---------------- CLOUD DB CONFIG ---------------- */
const config = {
    host: "maglev.proxy.rlwy.net",
    user: "root",
    password: "XQVHSTYBZHoEozHPpqrkrjIWBsmIMzxY",
    port: 37343,
    database: "railway",
    multipleStatements: true
};

(async () => {
    let connection;
    try {
        console.log("Reading db_backup.sql...");
        const sql = fs.readFileSync("db_backup.sql", "utf8");

        console.log(`Connecting to Cloud DB at ${config.host}:${config.port}...`);
        connection = await mysql.createConnection(config);
        console.log("✅ Custom Connection established!");

        console.log("Importing data... please wait.");

        // Disable FK checks to avoid order issues
        await connection.query("SET FOREIGN_KEY_CHECKS=0");

        // Execute the backup SQL
        await connection.query(sql);

        // Re-enable FK checks
        await connection.query("SET FOREIGN_KEY_CHECKS=1");

        console.log("✅ Data successfully migrated to Railway database!");

    } catch (err) {
        console.error("❌ MIGRATION FAILED:", err);
    } finally {
        if (connection) await connection.end();
    }
})();
