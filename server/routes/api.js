const express = require('express');
const router = express.Router();
const initDb = require("../db").initDb;
const getDb = require("../db").getDb;
/* GET api listing. */
router.get('/', (req, res) => {
  // initDb();
  const db = getDb();
  db.collection('startup_log').find().toArray(function (err, result) {
    if (err) throw err
    res.send(result);
  })

});

router.post('/savepost', (req, res) => {
  const db = getDb();
  db.collection("posts").insertOne(req.body, function (err, res) {
    if (err) throw err;
  });
  res.send(req.body);
});

router.get('/getpost', (req, res) => {
  const db = getDb();
  db.collection("posts").find().toArray(function (err, result) {
    if (err) throw err
    res.send(result);
  })
});
router.get('/getpostbyid/:id', (req, res) => {
  console.log(req.params.id);
  const db = getDb();
  var object = db.collection("posts").findOne({ heading: 'haading' });
  console.log(object)
  if (object) {
    res.send(object);
  }
  // console.log(req.params.id);
  // res.send('result');
});

module.exports = router;