var express = require('express');
var router = express.Router();

require('dotenv').config();
const retrieveDocument = async () => {
  var mongoose = require('mongoose');
  mongoose.connect(process.env.API_KEY);
  const CategoriesModel = require('../models/categories');
  return await CategoriesModel.findOne({ name: 'Womens' });
};
/* GET users listing. */
router.get('/', async function (req, res, next) {
  const mensCategories = await retrieveDocument();

  //2 mappings to add the image paths and the names of thee subcategories and link id's
  let firstMappedResult = mensCategories.categories[0].categories.map(
    (categoryItem) => ({
      imagePath: 'images/' + categoryItem.image,
      name: categoryItem.name,
      idLink: `${process.env.CYCLIC_URL}/womansClothing/${categoryItem.id}`,
    })
  );
  let secondMappedResult = mensCategories.categories[1].categories.map(
    (categoryItem) => ({
      imagePath: 'images/' + categoryItem.image,
      name: categoryItem.name,
      idLink: `${process.env.CYCLIC_URL}/womansClothing/${categoryItem.id}`,
    })
  );
  let thirdMappedResult = mensCategories.categories[2].categories.map(
    (categoryItem) => ({
      imagePath: 'images/' + categoryItem.image,
      name: categoryItem.name,
      idLink: `${process.env.CYCLIC_URL}/womansClothing/${categoryItem.id}`,
    })
  );

  let mappedResult = {};
  mappedResult.womensClothing = firstMappedResult;
  mappedResult.womensClothing.subcategory_name = "Women's Clothing";
  mappedResult.womensJewelry = secondMappedResult;
  mappedResult.womensJewelry.subcategory_name = "Women's Jewelry";
  mappedResult.womensAccesories = thirdMappedResult;
  mappedResult.womensAccesories.subcategory_name = "women's Accesories";
  let link = req.protocol + '://' + req.get('host') + req.originalUrl;
  let breadcrumbs = [];

  console.log(mappedResult);

  if (`${process.env.CYCLIC_URL}/womansClothing/` === link) {
    let object1 = {};
    object1.link = `${process.env.CYCLIC_URL}`;
    object1.name = 'Home';
    breadcrumbs.push(object1);
    let object2 = {};
    object2.link = `${process.env.CYCLIC_URL}/womansClothing`;
    object2.name = 'Womans Clothing';
    breadcrumbs.push(object2);
  }
  res.render('subCategories', {
    categoryName: 'Womans',
    title: 'Robbing City Galati',
    subcategories: mappedResult,
    currentUrl: breadcrumbs,
    clothingCategory: false,
  });
});

module.exports = router;