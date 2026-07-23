const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const { isValidSearchTerm } = require('./public/validate.js');

const app = express();
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const TABLE = process.env.DB_TABLE;

app.post('/search', async (req, res) => {
  const term = (req.body.term || '').trim();
  if (!isValidSearchTerm(term)) {
    return res.status(400).send('Invalid search term.');
  }

  await pool.query(`INSERT INTO \`${TABLE}\` (search_query) VALUES (?)`, [term]);

  res.send(`<!DOCTYPE html>
<html lang="en">
<head><title>Result</title></head>
<body>
  <h1>Search Result</h1>
  <p>${term}</p>
  <a href="/"><button>Back to Home</button></a>
</body>
</html>`);
});

app.listen(3000, () => console.log('App listening on port 3000'));
