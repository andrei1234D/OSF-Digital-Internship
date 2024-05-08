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
/* GET home page. */

let clothingCategory = true;
let womansCategoriesButton = process.env.CYCLIC_URL + '/womansClothing';
let mensCategoriesButton = process.env.CYCLIC_URL + '/mensClothing';

router.get('/', async function (req, res, next) {
  const product = await retrieveDocument();

  //Getting the link
  let link;

  if (process.env.CYCLIC_URL === 'https://shy-puce-reindeer-hem.cyclic.app')
    link = req.protocol + 's://' + req.get('host') + req.originalUrl;
  else link = req.protocol + '://' + req.get('host') + req.originalUrl;
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
  const createObjectBreadcrumb = (object, link, name) => {
    object = {};
    object.link = link;
    object.name = name;
    return object;
  };

  let breadcrumbs = [];
  if (`${process.env.CYCLIC_URL}/mensClothing/${id1}/${id2}` === link) {
    clothingCategory = true;
    let object = {};
    breadcrumbs.push(
      createObjectBreadcrumb(object, `${process.env.CYCLIC_URL}`, `Home`)
    );
    breadcrumbs.push(
      createObjectBreadcrumb(
        object,
        `${process.env.CYCLIC_URL}/mensClothing`,
        `Men's Clothing`
      )
    );
    breadcrumbs.push(
      createObjectBreadcrumb(
        object,
        `${process.env.CYCLIC_URL}/mensClothing/${id1}`,
        `${id1}`
      )
    );
    breadcrumbs.push(
      createObjectBreadcrumb(
        object,
        `${process.env.CYCLIC_URL}/mensClothing/${id1}/${id2}`,
        `${id2}`
      )
    );
  } else if (
    `${process.env.CYCLIC_URL}/womansClothing/${id1}/${id2}` === link
  ) {
    clothingCategory = false;
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
        `${process.env.CYCLIC_URL}/womansClothing/${id1}`,
        `${id1}`
      )
    );
    breadcrumbs.push(
      createObjectBreadcrumb(
        object,
        `${process.env.CYCLIC_URL}/womansClothing/${id1}/${id2}`,
        `${id2}`
      )
    );
  }
  let mappedResult = {};
  product.forEach((item) => {
    if (item.name === id2) {
      mappedResult.price = item.price;
      mappedResult.name = item.name;
      mappedResult.long_description = item.long_description;
      mappedResult.imagePath =
        '/mensClothing/images/' + item.image_groups[0].images[0].link;
    }
  });

  res.render('product', {
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
