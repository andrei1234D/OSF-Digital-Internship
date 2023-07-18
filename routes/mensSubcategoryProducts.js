var express = require('express');
const { map } = require('../app');
var router = express.Router();

require('dotenv').config();
const retrieveDocument = async () => {
  var mongoose = require('mongoose');
  mongoose.connect(process.env.API_KEY);
  const ProductModel = require('../models/product');
  return await ProductModel.find();
};
/* GET home page. */
router.get('/', async function (req, res, next) {
  let link = req.protocol + '://' + req.get('host') + req.originalUrl;

  let id = link.split('3000/').pop();
  id = id.split('/');
  console.log(id);
  let breadcrumbs = [];
  let clothingCategory = false;
  switch (link) {
    case `${process.env.CYCLIC_URL}/womansClothing/${id[1]}`:
      let object1 = {};
      object1.link = `${process.env.CYCLIC_URL}`;
      object1.name = 'Home';
      breadcrumbs.push(object1);
      let object2 = {};
      object2.link = `${process.env.CYCLIC_URL}/womansClothing`;
      object2.name = 'Womans Clothing';
      breadcrumbs.push(object2);
      let object3 = {};
      object3.link = `${process.env.CYCLIC_URL}/womansClothing/${id[1]}`;
      object3.name = id[1];
      breadcrumbs.push(object3);
      break;
    default:
    case `${process.env.CYCLIC_URL}/mensClothing/${id[1]}`:
      clothingCategory = true;
      let object4 = {};
      object4.link = `${process.env.CYCLIC_URL}`;
      object4.name = 'Home';
      breadcrumbs.push(object4);
      let object5 = {};
      object5.link = `${process.env.CYCLIC_URL}/mensClothing`;
      object5.name = 'Mens Clothing';
      breadcrumbs.push(object5);
      let object6 = {};
      object6.link = `${process.env.CYCLIC_URL}/mensClothing/${id[1]}`;
      object6.name = id[1];
      breadcrumbs.push(object6);
      break;
  }
  const product = await retrieveDocument();
  let mappedResult = [];
  product.map((item) => {
    if (item.primary_category_id === id[1]) {
      let object = {};
      object.price = item.price;
      object.name = item.name;
      object.short_description = item.short_description;
      object.imagePath = 'images/' + item.image_groups[0].images[0].link;
      if (id[0] === 'mensClothing') {
        object.productLink = `${process.env.CYCLIC_URL}/mensClothing/${
          id[1]
        }/${item.name.replace(/ /g, '_')}`;
      } else {
        object.productLink = `${process.env.CYCLIC_URL}/womansClothing/${
          id[1]
        }/${item.name.replace(/ /g, '_')}`;
      }
      mappedResult.push(object);
    }
  });
  console.log('mapped result is: ' + mappedResult);
  res.render('mensSubcategoryProducts', {
    title: 'Robbing City Galati',
    currentUrl: breadcrumbs,
    product: mappedResult,
    clothingCategory: clothingCategory,
  });
});

module.exports = router;