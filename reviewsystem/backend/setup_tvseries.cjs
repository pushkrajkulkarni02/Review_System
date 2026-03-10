const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2");

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
    console.log("MySQL Connected");
    createTables();
});

function createTables() {
    // Create tvseries table
    const createTvSeriesTable = `
    CREATE TABLE IF NOT EXISTS tvseries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      poster VARCHAR(500),
      cast TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

    // Create tvseries_reviews table
    const createTvSeriesReviewsTable = `
    CREATE TABLE IF NOT EXISTS tvseries_reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tvseries_id INT NOT NULL,
      user_name VARCHAR(255) NOT NULL,
      rating INT NOT NULL,
      review TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tvseries_id) REFERENCES tvseries(id) ON DELETE CASCADE
    )
  `;

    // Sample data
    const insertSampleData = `
    INSERT INTO tvseries (title, description, poster, cast) VALUES
    ('Breaking Bad', 'A high school chemistry teacher turned methamphetamine producer partners with a former student.', 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', 'Bryan Cranston, Aaron Paul, Anna Gunn'),
    ('Game of Thrones', 'Nine noble families fight for control over the lands of Westeros.', 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg', 'Emilia Clarke, Peter Dinklage, Kit Harington'),
    ('Stranger Things', 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.', 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', 'Millie Bobby Brown, Finn Wolfhard, Winona Ryder'),
    ('The Office', 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes.', 'https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg', 'Steve Carell, Rainn Wilson, John Krasinski'),
    ('Friends', 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.', 'https://image.tmdb.org/t/p/w500/f496cm9enuEsZkSPzCwnTESEK5s.jpg', 'Jennifer Aniston, Courteney Cox, Lisa Kudrow'),
    ('The Crown', 'Follows the political rivalries and romance of Queen Elizabeth II reign and the events that shaped the second half of the 20th century.', 'https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg', 'Claire Foy, Olivia Colman, Imelda Staunton'),
    ('Sherlock', 'A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.', 'https://image.tmdb.org/t/p/w500/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg', 'Benedict Cumberbatch, Martin Freeman'),
    ('The Mandalorian', 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.', 'https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg', 'Pedro Pascal, Gina Carano'),
    ('Peaky Blinders', 'A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps.', 'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg', 'Cillian Murphy, Paul Anderson, Helen McCrory'),
    ('The Witcher', 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.', 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg', 'Henry Cavill, Anya Chalotra, Freya Allan')
  `;

    console.log("Creating tvseries table...");
    db.query(createTvSeriesTable, (err) => {
        if (err) {
            console.error("Error creating tvseries table:", err);
            db.end();
            return;
        }
        console.log("✓ tvseries table created");

        console.log("Creating tvseries_reviews table...");
        db.query(createTvSeriesReviewsTable, (err) => {
            if (err) {
                console.error("Error creating tvseries_reviews table:", err);
                db.end();
                return;
            }
            console.log("✓ tvseries_reviews table created");

            console.log("Inserting sample TV series data...");
            db.query(insertSampleData, (err) => {
                if (err) {
                    console.error("Error inserting sample data:", err);
                    console.log("Note: This is normal if data already exists");
                } else {
                    console.log("✓ Sample TV series data inserted");
                }

                console.log("\n✅ All done! TV Series tables are ready.");
                db.end();
            });
        });
    });
}
