var express = require('express');
require('dotenv').config();
var router = express.Router();
console.log(process.env.API_KEY);
/* GET home page. */
router.get('/', async function (req, res, next) {
  let link = req.protocol + '://' + req.get('host') + req.originalUrl;
  let breadcrumbs = [];
  if (link === process.env.CYCLIC_URL) {
    let object = {};
    object.link = `${process.env.CYCLIC_URL}`;
    object.name = 'Home';
    breadcrumbs.push(object);
  }
  console.log(breadcrumbs);
  res.render('index', {
    title: 'Robbing City Galati',
    currentUrl: breadcrumbs,
    menButtonLink: process.env.CYCLIC_URL + '/mensClothing',
    womanButtonLink: process.env.CYCLIC_URL + '/womansClothing',
  });
});

module.exports = router;
