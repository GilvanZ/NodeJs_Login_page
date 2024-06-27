const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB Configuration
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;
client.connect(err => {
  if (err) throw err;
  db = client.db('myApp');
  console.log("Connected to MongoDB");
});

// Express Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Route for the Home Page
app.get('/', (req, res) => {
  res.render('login');
});

// Route for the Login Page
app.get('/login', (req, res) => {
  res.render('login');
});

// Route for the Registration Page
app.get('/register', (req, res) => {
  res.render('register');
});

// Handle Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.collection('users').findOne({ email, password }, (err, user) => {
    if (err) throw err;
    if (user) {
      res.send('Login successful');
    } else {
      res.send('Login failed');
    }
  });
});

// Handle Registration
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  db.collection('users').insertOne({ name, email, password }, (err, result) => {
    if (err) throw err;
    res.render('successful');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});