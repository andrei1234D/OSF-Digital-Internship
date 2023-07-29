let express = require('express');
let router = express.Router();
require('dotenv').config();

/* GET home page. */
let womansCategoriesButton = process.env.CYCLIC_URL + '/womansClothing';
let mensCategoriesButton = process.env.CYCLIC_URL + '/mensClothing';
router.get('/', async function (req, res, next) {
  let breadcrumbs = [];
  let object = {};
  object.link = `${process.env.CYCLIC_URL}`;
  object.name = 'Home';
  breadcrumbs.push(object);
  res.render('index', {
    title: 'Robbing City Galati',
    currentUrl: breadcrumbs,
    womanButton: womansCategoriesButton,
    mensButton: mensCategoriesButton,
    REGISTER_URL: process.env.REGISTER_URL,
  });
});

module.exports = router;
