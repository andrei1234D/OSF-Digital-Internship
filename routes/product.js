var express = require('express');
var router = express.Router();

let uri = process.env.API_KEY;
const retrieveDocument = async () => {
  var mongoose = require('mongoose');
  mongoose.connect(uri);
  const ProductModel = require('../models/product');
  return await ProductModel.find();
};
/* GET home page. */
router.get('/', async function (req, res, next) {
  //Getting the link
  let link = req.protocol + '://' + req.get('host') + req.originalUrl;

  //URL Manipulation
  let id = link.split('Clothing/').pop();

  id = id.split('/');
  let id1 = id[0];
  let id2 = id[1];

  if (id2.includes('%20')) {
    id2 = id2.replace(/%20/g, ' ');
    link = link.replace(/%20/g, ' ');
  } else {
    id2 = id2.replace(/_/g, ' ');
    link = link.replace(/_/g, ' ');
  }

  //breadcrumbs
  let breadcrumbs = [];
  let clothingCategory = false;
  if (`http://localhost:3000/mensClothing/${id1}/${id2}` === link) {
    clothingCategory = true;
    let object = {};
    object.link = 'http://localhost:3000';
    object.name = 'Home';
    breadcrumbs.push(object);
    let object1 = {};
    object1.link = 'http://localhost:3000/mensClothing';
    object1.name = 'Mens Clothing';
    breadcrumbs.push(object1);
    let object5 = {};
    object5.link = `http://localhost:3000/mensClothing/${id1}`;
    object5.name = id1;
    breadcrumbs.push(object5);
    let object6 = {};
    object6.link = `http://localhost:3000/mensClothing/${id1}/${id2}`;
    object6.name = id2;
    breadcrumbs.push(object6);
  } else if (`http://localhost:3000/womansClothing/${id1}/${id2}` === link) {
    let object = {};
    object.link = 'http://localhost:3000';
    object.name = 'Home';
    breadcrumbs.push(object);
    let object1 = {};
    object1.link = 'http://localhost:3000/womansClothing';
    object1.name = 'Womans Clothing';
    breadcrumbs.push(object1);
    let object5 = {};
    object5.link = `http://localhost:3000/womansClothing/${id1}`;
    object5.name = id1;
    breadcrumbs.push(object5);
    let object6 = {};
    object6.link = `http://localhost:3000/womansClothing/${id1}/${id2}`;
    object6.name = id2;
    breadcrumbs.push(object6);
  }

  const product = await retrieveDocument();
  let mappedResult = {};
  product.map((item) => {
    if (item.name === id2) {
      mappedResult.price = item.price;
      mappedResult.name = item.name;
      mappedResult.long_description = item.long_description;
      mappedResult.imagePath =
        '/mensClothing/images/' + item.image_groups[0].images[0].link;
    }
  });
  console.log(mappedResult);
  res.render('product', {
    title: 'Robbing City Galati',
    currentUrl: breadcrumbs,
    product: mappedResult,
    clothingCategory: clothingCategory,
  });
});

module.exports = router;
