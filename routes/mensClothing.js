var express = require('express');
var router = express.Router();
require('dotenv').config();

let uri = process.env.API_KEY;
const retrieveDocument = async () => {
  var mongoose = require('mongoose');
  mongoose.connect(uri);
  const CategoriesModel = require('../models/categories');
  return await CategoriesModel.findOne({ name: 'Mens' });
};
/* GET users listing. */
router.get('/', async function (req, res, next) {
  const mensCategories = await retrieveDocument();
  //2 mappings to add the image paths and the names of thee subcategories and link id's
  let firstMappedResult = mensCategories.categories[0].categories.map(
    (categoryItem) => ({
      imagePath: 'images/' + categoryItem.image,
      name: categoryItem.name,
      idLink: `${process.env.CYCLIC_URL}/mensClothing/${categoryItem.id}`,
    })
  );
  let secondMappedResult = mensCategories.categories[1].categories.map(
    (categoryItem) => ({
      imagePath: 'images/' + categoryItem.image,
      name: categoryItem.name,
      idLink: `${process.env.CYCLIC_URL}/mensClothing/${categoryItem.id}`,
    })
  );

  let mappedResult = {};
  mappedResult.mensClothing = firstMappedResult;
  mappedResult.mensClothing.subcategory_name = 'Mens Clothing';
  mappedResult.mensAccessories = secondMappedResult;
  mappedResult.mensAccessories.subcategory_name = 'Mens Accesories';
  let breadcrumbs = [];

  console.log(mappedResult);

  let object1 = {};
  object1.link = `${process.env.CYCLIC_URL}`;
  object1.name = 'Home';
  breadcrumbs.push(object1);
  let object2 = {};
  object2.link = `${process.env.CYCLIC_URL}/mensClothing`;
  object2.name = 'Mens Clothing';
  breadcrumbs.push(object2);
  res.render('subCategories', {
    categoryName: 'Mens',
    title: 'Robbing City Galati',
    subcategories: mappedResult,
    currentUrl: breadcrumbs,
    clothingCategory: true,
  });
});

module.exports = router;
