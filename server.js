const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'database',
    password: 'password',
    port: '5432',
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10000000mb'}));
app.use(express.json( {limit: '10000000mb'}));

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );
        res.json(result.rows[0]);
    } catch(error) {
        console.error('Error registering user:', error);
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' }); // より明確なエラーメッセージ
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' }); // より明確なエラーメッセージ
        }

        // JWT の発行
        const token = jwt.sign({ id: user.id, username: user.username }, 'yourSecretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // 内部サーバーエラーの返却
    }
});

app.post('/logout', (req, res) => {
    res.sendStatus(200);
});

app.post('/add-text', async (req, res) => {
    const { textContent } = req.body;

    try {
        const result = await pool.query('INSERT INTO wikipediaText (text) VALUES ($1) RETURNING *', [textContent]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting data:' ,error);
        res.status(500).send('Internal Server Error');
    }
});

const port = 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})