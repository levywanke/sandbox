const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path'); 
require('dotenv').config(); 
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT,
});

app.use(cors()); 
app.use(express.json());

app.use(express.static(path.join(__dirname))); 

app.get('/api/products', async (req, res) => {
    try {
        const { category } = req.query; 
        const query = category ? 
            'SELECT * FROM products WHERE category_id = $1' : 
            'SELECT * FROM products';
        const values = category ? [category] : [];

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
