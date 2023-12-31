let express = require('express');
let router = express.Router();
require('dotenv').config();

/* GET home page. */
let womansCategoriesButton = process.env.CYCLIC_URL + '/womansClothing';
let mensCategoriesButton = process.env.CYCLIC_URL + '/mensClothing';
let breadcrumbs = [];
let object = {};
object.link = `${process.env.CYCLIC_URL}`;
object.name = 'Home';
breadcrumbs.push(object);

router.get('/', async function (req, res, next) {
  res.render('index', {
    title: 'Shopping Mania',
    currentUrl: breadcrumbs,
    womanButton: womansCategoriesButton,
    mensButton: mensCategoriesButton,
    REGISTER_URL: process.env.REGISTER_URL,
  });
});

module.exports = router;
