const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostsSchema = new Schema({
    heading: String,
    postBy: String,
    date: String,
    img: String,
    content: String,
    mainImg: String,
    tags: String,
    min: String,
    homePageText: String,
    category: String
});

mongoose.model('Posts', PostsSchema);