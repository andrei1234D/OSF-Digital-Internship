var express = require('express');
var router = express.Router();
require('dotenv').config();

/* GET home page. */
console.log(process.env);

router.get('/', async function (req, res, next) {
  let link = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(link);
  let breadcrumbs = [];
  let object = {};
  object.link = `${process.env.CYCLIC_URL}`;
  object.name = 'Home';
  breadcrumbs.push(object);
  console.log(breadcrumbs);
  res.render('index', {
    title: 'Robbing City Galati',
    currentUrl: breadcrumbs,
  });
});

module.exports = router;
