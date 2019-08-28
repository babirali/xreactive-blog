const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/upload', require('./upload'));
router.use('/category', require('./category'));

module.exports = router;