var express = require('express');
var router = express.Router();
require('dotenv').config();

let uri = process.env.API_KEY;
const retrieveDocument = async () => {
  var mongoose = require('mongoose');
  mongoose.connect(uri);
  const ProductModel = require('../models/product');
  return await ProductModel.find();
};
/* GET home page. */

let clothingCategory = false;

router.get('/', async function (req, res, next) {
  const product = await retrieveDocument();

  //Getting the link
  let link = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(`THE LINK IN VARIABLE LINK IS:  ${link}`);

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

  console.log(
    `THE CYCLIC URL IS:  ${process.env.CYCLIC_URL}/mensClothing/${id1}/${id2}`
  );

  //breadcrumbs
  let breadcrumbs = [];
  if (`${process.env.CYCLIC_URL}/mensClothing/${id1}/${id2}` === link) {
    clothingCategory = true;
    let object = {};
    object.link = `${process.env.CYCLIC_URL}`;
    object.name = 'Home';
    breadcrumbs.push(object);
    let object1 = {};
    object1.link = `${process.env.CYCLIC_URL}/mensClothing`;
    object1.name = 'Mens Clothing';
    breadcrumbs.push(object1);
    let object5 = {};
    object5.link = `${process.env.CYCLIC_URL}/mensClothing/${id1}`;
    object5.name = id1;
    breadcrumbs.push(object5);
    let object6 = {};
    object6.link = `${process.env.CYCLIC_URL}/mensClothing/${id1}/${id2}`;
    object6.name = id2;
    breadcrumbs.push(object6);
  } else if (
    `${process.env.CYCLIC_URL}/womansClothing/${id1}/${id2}` === link
  ) {
    let object = {};
    object.link = `${process.env.CYCLIC_URL}`;
    object.name = 'Home';
    breadcrumbs.push(object);
    let object1 = {};
    object1.link = `${process.env.CYCLIC_URL}/womansClothing`;
    object1.name = 'Womans Clothing';
    breadcrumbs.push(object1);
    let object5 = {};
    object5.link = `${process.env.CYCLIC_URL}/womansClothing/${id1}`;
    object5.name = id1;
    breadcrumbs.push(object5);
    let object6 = {};
    object6.link = `${process.env.CYCLIC_URL}/womansClothing/${id1}/${id2}`;
    object6.name = id2;
    breadcrumbs.push(object6);
  }
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
  console.log(breadcrumbs);

  res.render('product', {
    title: 'Robbing City Galati',
    currentUrl: breadcrumbs,
    product: mappedResult,
    clothingCategory: clothingCategory,
  });
});

module.exports = router;
