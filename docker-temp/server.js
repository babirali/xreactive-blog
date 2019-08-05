const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 8081
const { Schema } = mongoose;

mongoose.connect('mongodb://10.0.75.1/xreactive', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});
const PostsSchema = new Schema({
    heading: String,
    postBy: String,
    date: String,
    img: String,
    content: String,
    mainImg:String
});

mongoose.model('Posts', PostsSchema);

app.get('/m',(req, res, next) => {
    const Posts = mongoose.model('Posts');
    return Posts.find().then((posts) => res.json(posts))
});

app.get('/', (req, res) => res.send('Hello World! test2'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))