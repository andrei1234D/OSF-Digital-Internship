let express = require('express');
let router = express.Router();
require('dotenv').config();
/* GET users listing. */

let currentUrl = [];
let object = {};
let object1 = {};
object.link = process.env.CYCLIC_URL;
object.name = 'Home';
currentUrl.push(object);
let womansCategoriesButton = process.env.CYCLIC_URL + '/womansClothing';
let mensCategoriesButton = process.env.CYCLIC_URL + '/mensClothing';

object1.link = `${process.env.CYCLIC_URL}/register`;
object1.name = 'Registration';
currentUrl.push(object1);

router.get('/', function (req, res, next) {
  res.render('register', {
    title: 'Shopping Mania',
    homePageUrl: process.env.CYCLIC_URL,
    currentUrl: currentUrl,
    womanButton: womansCategoriesButton,
    mensButton: mensCategoriesButton,
  });
});
module.exports = router;
