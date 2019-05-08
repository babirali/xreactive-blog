const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Posts = mongoose.model('Posts');

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
module.exports = router;