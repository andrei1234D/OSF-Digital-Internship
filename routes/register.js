var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
/* GET users listing. */

let currentUrl = [];
let object = {};
let object1 = {};
object.link = process.env.CYCLIC_URL;
object.name = 'Home';
currentUrl.push(object);

object1.link = `${process.env.CYCLIC_URL}/register`;
object1.name = 'Registration';
currentUrl.push(object1);

router.get('/', function (req, res, next) {
  res.render('register', {
    title: 'Robbing City Galati',
    homePageUrl: process.env.CYCLIC_URL,
    currentUrl: currentUrl,
  });
});
module.exports = router;
