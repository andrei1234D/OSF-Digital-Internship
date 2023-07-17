var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  let link = req.protocol + '://' + req.get('host') + req.originalUrl;
  let breadcrumbs = [];
  console.log;
  if (link === 'https://coral-camel-wear.cyclic.app/') {
    let object = {};
    object.link = 'https://coral-camel-wear.cyclic.app';
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
