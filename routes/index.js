var express = require('express');
require('dotenv').config();
/* GET home page. */
router.get('/', async function (req, res, next) {
  let link = req.protocol + '://' + req.get('host') + req.originalUrl;
  let breadcrumbs = [];
  if (link === process.env.CYCLIC_URL) {
    let object = {};
    object.link = 'http://localhost:3000';
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
