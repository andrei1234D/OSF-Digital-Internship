var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
/* GET users listing. */
let womansCategoriesButton = process.env.CYCLIC_URL + '/womansClothing';
let mensCategoriesButton = process.env.CYCLIC_URL + '/mensClothing';
router.get('/', function (req, res, next) {
  res.render('register', {
    title: 'Robbing City Galati',
    homePageUrl: process.env.CYCLIC_URL,
    womanButton: womansCategoriesButton,
    mensButton: mensCategoriesButton,
  });
});
module.exports = router;
