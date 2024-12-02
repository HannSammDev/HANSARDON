const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'hansardon',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Register endpoint
app.post('/register', (req, res) => {
    const setName = req.body.Name;
    const setEmail = req.body.Email;
    const setPassword = req.body.Password;
    const SQL = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const Values = [setName, setEmail, setPassword];

    db.query(SQL, Values, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            console.log('User Inserted Successfully');
            res.json({ message: 'User Added' });
        }
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const loginEmail = req.body.Email;
    const loginPassword = req.body.Password;
    const SQL = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const Values = [loginEmail, loginPassword];

    db.query(SQL, Values, (err, results) => {
        if (err) {
            console.error("Error retrieving user:", err);
            return res.status(500).json({ error: "An error occurred while logging in." });
        }

        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(401).json({ error: 'Credentials do not match!' });
        }
    });
});

// Logout
app.get("/logout", (req, res) => {
   
  
    res.json({ message: "Logged out successfully" });
});

app.listen(3003, () => {
    console.log('Server is Running  Port 3003');
});

app.get("/email", async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.query("SELECT email FROM users WHERE isLoggedIn = ?", [true]);
        connection.release();
        if (rows.length > 0) {
            res.json({ email: rows[0].email });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user email:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
