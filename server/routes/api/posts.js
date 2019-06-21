const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Posts = mongoose.model('Posts');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/' // this saves your file into a directory called "uploads"
});

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

const path = require('path');
const fs = require('fs');

router.get('/', auth.optional, (req, res, next) => {
    return Posts.find().then((posts) => res.json(posts))
});

router.post('/save', auth.optional, (req, res, next) => {
    const postData = new Posts(req.body);
    postData.save().then(() => {
        console.log('saved');
        return res.json({})
    })
});

router.post('/upload1', multipartMiddleware, (req, res, next) => {
    var fs = require('fs');
    fs.readFile(req.files.upload.path, function (err, data) {
        var newPath = __dirname + '/uploads/' + req.files.upload.name;
        fs.writeFile(newPath, data, function (err) {
            if (err) console.log({ err: err });
            else {
                return res.json({})
            }
        });
    });
});
const directoryPath = path.join(__dirname, 'uploads');
router.get('/browse', auth.optional, (req, res, next) => {
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
        });
        console.log(__dirname);
        return res.json(files)

    });
});

router.get('/get/:id', (req, res, next) => {

    Posts.findById(req.params.id, function (err, post) { res.json(post); });
});

router.get('/delete/:id', (req, res, next) => {
    Posts.findOneAndRemove({ _id: req.params.id }).then(response => {
        console.log(response)
        return res.json('Deleted')
    })
        .catch(err => { console.error(err) })
});
module.exports = router;