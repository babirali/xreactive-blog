const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Posts = mongoose.model('Posts');

router.get('/', auth.optional, (req, res, next) => {
    return Posts.find().then((posts) => res.json(posts))
});

router.post('/save', auth.optional, (req, res, next) => {
    req.body.xid = 'test';
    const postData = new Posts(req.body);
    postData.save().then(() => {
        console.log('saved');
        return res.json({})
    })
});

router.get('/get/:id', (req, res, next) => {

    Posts.findById(req.params.id, function (err, post) { res.json(post); });
});

router.get('/delete/:id', (req, res, next) => {
    Posts.findOneAndRemove({ _id: req.params.id }).then(response => {
        return res.json('Deleted')
    })
        .catch(err => { console.error(err) })
});
module.exports = router;