// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session');
const mongoose = require('mongoose');

//Configure Mongoose
mongoose.connect('mongodb://localhost/xreactive');
mongoose.set('debug', true);

// const initDb = require("./db").initDb;
// const getDb = require("./db").getDb;

// Get our API routes
// const api = require('./routes/api');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build'))); // Point static path to dist
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

// Set our api routes
// app.use('/api', api);

require('./models/users');
require('./models/posts');
require('./config/passport');
app.use(require('./routes'));

app.use(express.static(path.join(__dirname, 'routes/api/uploads')))

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);

// initDb(function (err) {
    server.listen(port, () => console.log(`API running on localhost:${port}`));
// });