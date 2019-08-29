// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config()

//Configure Mongoose
if (process.env.PORT == 3022) {
    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
    mongoose.set('debug', true);
} else {
    mongoose.connect(process.env.MONGODB_PROD, { useNewUrlParser: true });
}

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './build'))); // Point static path to build
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

require('./models');
require('./config/passport');
app.use(require('./routes'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

const port = process.env.PORT;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));