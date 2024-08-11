require('dotenv').config();

const express = require('express');
const cors = require('cors');
// Use express.json() instead of body-parser
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json()); // Use express's built-in JSON parser

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("ERROR CONNECTING TO MYSQL:", err);
        return;
    }
    console.log("Connected to MYSQL");
});

// API Endpoints
app.get('/api/banner', (req, res) => {
    console.log('Received GET request for banner');
    db.query('SELECT * FROM banner LIMIT 1', (err, results) => {
        if (err) {
            console.error('Error fetching banner:', err);
            return res.status(500).send('Error fetching banner');
        }
        res.json(results[0]);
    });
});

// API endpoint to update banner data
app.post('/api/banner', (req, res) => {
    console.log('Received POST request to update banner');
    const { visible, description, timer, link } = req.body;
    db.query(
        'UPDATE banner SET visible = ?, description = ?, timer = ?, link = ? WHERE id = 1',
        [visible, description, timer, link],
        (err) => {
            if (err) {
                console.error('Error updating banner:', err);
                return res.status(500).send('Error updating banner');
            }
            res.send('Banner updated successfully');
        }
    );
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
});
