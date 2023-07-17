var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  let link = req.protocol + '://' + req.get('host') + req.originalUrl;
  let breadcrumbs = [];
  if (link === 'http://localhost:3000/') {
    let object = {};
    object.link = 'http://localhost:3000';
    object.name = 'Home';
    breadcrumbs.push(object);
  }
  console.log(breadcrumbs);
  res.render('index', {
    title: 'Robbing City Galati',
    currentUrl: breadcrumbs,
  });
});

module.exports = router;
