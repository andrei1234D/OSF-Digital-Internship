var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('register', {
    title: 'Robbing City Galati',
  });
});

module.exports = router;
