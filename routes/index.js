var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  let link = req.protocol + '://' + req.get('host') + req.originalUrl;
  let breadcrumbs = [];
  switch (link) {
    case 'http://localhost:3000/':
      let object = {};
      object.link = 'http://localhost:3000';
      object.name = 'Home';
      breadcrumbs.push(object);
      break;
    case 'http://localhost:3000/mensClothing':
      let object1 = {};
      object1.link = 'http://localhost:3000';
      object1.name = 'Home';
      breadcrumbs.push(object1);
      let object2 = {};
      object2.link = 'http://localhost:3000/mensClothing';
      object2.name = 'Mens Clothing';
      breadcrumbs.push(object2);
      break;
    default:
      break;
  }
  console.log(breadcrumbs);
  res.render('index', {
    title: 'Robbing City Galati',
    currentUrl: breadcrumbs,
  });
});

module.exports = router;
