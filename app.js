const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Hardcoded user credentials for simplicity
const user = {
    username: 'admin',
    password: 'password'
};

// Route for the login page
app.get('/', (req, res) => {
    res.render('login');
});

// Route to handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === user.username && password === user.password) {
        res.render('home', { username });
    } else {
        res.render('login', { error: 'Invalid username or password' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
