const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Categroy = mongoose.model('Category');

router.get('/', auth.optional, (req, res, next) => {
    return Categroy.find().then((categroy) => res.json(categroy))
});

router.post('/save', auth.optional, (req, res, next) => {
    const categroyData = new Categroy(req.body);
    categroyData.save().then(() => {
        console.log('saved');
        return res.json({})
    })
});

router.get('/get/:id', (req, res, next) => {
    Categroy.findById(req.params.id, function (err, post) { res.json(post); });
});

router.get('/delete/:id', (req, res, next) => {
    Categroy.findOneAndRemove({ _id: req.params.id }).then(response => {
        return res.json('Deleted')
    })
        .catch(err => { console.error(err) })
});
module.exports = router;