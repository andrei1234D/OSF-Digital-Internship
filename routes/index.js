var express = require('express');
var router = express.Router();
require('dotenv').config();

/* GET home page. */
let womansCategoriesButton = process.env.CYCLIC_URL + '/womansClothing';
console.log(womansCategoriesButton);
let mensCategoriesButton = process.env.CYCLIC_URL + '/mensClothing';
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
    womanButton: womansCategoriesButton,
    mensButton: mensCategoriesButton,
  });
});

module.exports = router;
