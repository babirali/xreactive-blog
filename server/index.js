// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session');
const mongoose = require('mongoose');

//Configure Mongoose
if (process.env.PORT == 3022) {
    mongoose.connect('mongodb://10.0.75.1/xreactive', { useNewUrlParser: true });
    // mongoose.connect('mongodb://xreactive-mongodb:uTEXzzvZ8qCATRALDJGpP8HqklCHtqXxAc7DQUOzb88WT6vQNVLb7KMNcSrfsLjc98xF55oOp890cusk4WWTlg==@xreactive-mongodb.documents.azure.com:10255/xreactive?ssl=true&replicaSet=globaldb', { useNewUrlParser: true });
} else {
    mongoose.connect('mongodb://xreactive-mongodb:uTEXzzvZ8qCATRALDJGpP8HqklCHtqXxAc7DQUOzb88WT6vQNVLb7KMNcSrfsLjc98xF55oOp890cusk4WWTlg==@xreactive-mongodb.documents.azure.com:10255/xreactive?ssl=true&replicaSet=globaldb', { useNewUrlParser: true });
}


mongoose.set('debug', true);

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './build'))); // Point static path to build
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

require('./models');
require('./config/passport');
app.use(require('./routes'));

app.use(express.static(path.join(__dirname, 'routes/api/uploads')))

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

const port = process.env.PORT || '3022';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));