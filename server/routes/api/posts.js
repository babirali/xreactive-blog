const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Posts = mongoose.model('Posts');

router.get('/', auth.optional, (req, res, next) => {
    return Posts.find().sort({ date: -1 }).then((posts) => res.json(posts))
});

router.post('/save', auth.optional, (req, res, next) => {
    const postData = new Posts(req.body);
    postData.save().then(() => {
        return res.json({})
    })
});
router.post('/update', auth.optional, (req, res, next) => {
    Posts.
        findOneAndUpdate(
            {
                _id: req.body._id  // search query
            },
            {
                ...req.body   // field:values to update
            },
            {
                new: true,
            })
        .then(() => {
            return res.json({})
        })
});

router.get('/get/:id', (req, res, next) => {

    Posts.findById(req.params.id, function (err, post) { res.json(post); });
});

router.get('/delete/:id', (req, res, next) => {
    Posts.findOneAndRemove({ _id: req.params.id }).then(response => {
        return res.json('Deleted')
    }).catch(err => { console.error(err) })
});

router.get('/getpostbycategory/:category', (req, res, next) => {
    Posts.find({ category: req.params.category }).sort({ date: -1 }).then(response => {
        return res.json(response)
    }).catch(err => { console.error(err) })
});

module.exports = router;