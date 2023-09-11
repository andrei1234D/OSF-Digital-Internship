let express = require('express');
let router = express.Router();
require('dotenv').config();

let uri = process.env.API_KEY;
const retrieveDocument = async () => {
  let mongoose = require('mongoose');
  mongoose.connect(uri);
  const ProductModel = require('../models/product');
  return await ProductModel.find();
};
let womansCategoriesButton = process.env.CYCLIC_URL + '/womansClothing';
let mensCategoriesButton = process.env.CYCLIC_URL + '/mensClothing';

/* GET home page. */
let clothingCategory = false;

router.get('/', async function (req, res, next) {
  let link;

  if (process.env.CYCLIC_URL === 'https://nice-boa-train.cyclic.app')
    link = req.protocol + 's://' + req.get('host') + req.originalUrl;
  else link = req.protocol + '://' + req.get('host') + req.originalUrl;

  let id = link.split(process.env.SPLIT_KEY).pop();
  id = id.split('/');

  const createObjectBreadcrumb = (object, link, name) => {
    object = {};
    object.link = link;
    object.name = name;
    return object;
  };

  let breadcrumbs = [];
  switch (link) {
    case `${process.env.CYCLIC_URL}/womansClothing/${id[1]}`:
      let object = {};
      breadcrumbs.push(
        createObjectBreadcrumb(object, `${process.env.CYCLIC_URL}`, `Home`)
      );
      breadcrumbs.push(
        createObjectBreadcrumb(
          object,
          `${process.env.CYCLIC_URL}/womansClothing`,
          `Women's Clothing`
        )
      );
      breadcrumbs.push(
        createObjectBreadcrumb(
          object,
          `${process.env.CYCLIC_URL}/womansClothing/${id[1]}`,
          `${id[1]}`
        )
      );
      break;
    case `${process.env.CYCLIC_URL}/mensClothing/${id[1]}`:
      clothingCategory = true;
      let object1 = {};
      breadcrumbs.push(
        createObjectBreadcrumb(object1, `${process.env.CYCLIC_URL}`, `Home`)
      );
      breadcrumbs.push(
        createObjectBreadcrumb(
          object1,
          `${process.env.CYCLIC_URL}/mensClothing`,
          `Men's Clothing`
        )
      );
      breadcrumbs.push(
        createObjectBreadcrumb(
          object1,
          `${process.env.CYCLIC_URL}/mensClothing/${id[1]}`,
          `${id[1]}`
        )
      );
      break;
  }

  const product = await retrieveDocument();
  let mappedResult = [];
  product.forEach((item) => {
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
  res.render('subcategoryProducts', {
    title: 'Shopping Mania',
    currentUrl: breadcrumbs,
    product: mappedResult,
    clothingCategory: clothingCategory,
    womanButton: womansCategoriesButton,
    mensButton: mensCategoriesButton,
    REGISTER_URL: process.env.REGISTER_URL,
  });
});

module.exports = router;
