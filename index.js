const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

// Create Express app
const app = express();

// Create SQLite database or open if it already exists
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create users table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            name TEXT,
            email TEXT,
            password TEXT
        )`);
    }
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Configure session middleware
app.use(session({
    secret: 'eee1de783b97e7922aacd37953e9ee146e310ce7c40c3cd1abd61ebe7bf4fcd3e3c997a1026b65264594b9931bd7549e15d427514cbc92b191d3ba2d03641f3d',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Set true if using HTTPS
}));

// Handle sign-up form submission
app.post('/signup', (req, res) => {
    const { username, name, email, password } = req.body;

    // Insert user into the database
    db.run(`INSERT INTO users (username, name, email, password) VALUES (?, ?, ?, ?)`,
        [username, name, email, password], function (err) {
            if (err) {
                console.error('Error inserting user into database:', err.message);
                res.status(500).send('Error signing up');
            } else {
                console.log('User added successfully');
                
                // Store user data in the session
                req.session.user = {
                    id: this.lastID,
                    username: username,
                    name: name,
                    email: email
                };
                console.log('Session data:', req.session.user); 
                // Redirect to home page after signup
                res.redirect(`/home.html?name=${encodeURIComponent(name)}`);
            }
        });
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, './Global/Login/', 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { email_username, password } = req.body;

    // Query the database to find matching user by email or username
    db.get(`SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?`, 
        [email_username, email_username, password], (err, user) => {
            if (err) {
                console.error('Database error:', err.message);
                res.status(500).send('Internal Server Error');
            } else if (!user) {
                // If no user is found, redirect with error query
                res.redirect('/login.html?error=1');
            } else {
                // Store user session data
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                };
                console.log('Logged in user:', req.session.user);

                // Redirect to home page upon successful login
                res.redirect(`/home.html?name=${encodeURIComponent(user.name)}`);
            }
        });
});
app.get('/getProfile', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Not logged in');
    }

    const userId = req.session.user.id;

    db.get('SELECT username, name, email FROM users WHERE id = ?', [userId], (err, user) => {
        if (err) {
            console.error('Error fetching user profile:', err.message);
            return res.status(500).send('Internal Server Error');
        }
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);  // Send the user data as JSON
    });
});

// Start the server
app.listen(10117, '0.0.0.0', () => {
    console.log('Server running on port 10117');
});
