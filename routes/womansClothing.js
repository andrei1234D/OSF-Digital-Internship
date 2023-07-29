let express = require('express');
let router = express.Router();
require('dotenv').config();
let uri = process.env.API_KEY;
const retrieveDocument = async () => {
  let mongoose = require('mongoose');
  mongoose.connect(uri);
  const CategoriesModel = require('../models/categories');
  return await CategoriesModel.findOne({ name: 'Womens' });
};

let womansCategoriesButton = process.env.CYCLIC_URL + '/womansClothing';
let mensCategoriesButton = process.env.CYCLIC_URL + '/mensClothing';

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const mensCategories = await retrieveDocument();

  //2 mappings to add the image paths and the names of thee subcategories and link id's
  let firstMappedResult = mensCategories.categories[0].categories.map(
    (categoryItem) => ({
      imagePath: 'images/' + categoryItem.image,
      name: categoryItem.name,
      idLink: `${process.env.CYCLIC_URL}/womansClothing/${categoryItem.id}`,
      subcategory_description: categoryItem.page_description,
    })
  );
  let secondMappedResult = mensCategories.categories[1].categories.map(
    (categoryItem) => ({
      imagePath: 'images/' + categoryItem.image,
      name: categoryItem.name,
      idLink: `${process.env.CYCLIC_URL}/womansClothing/${categoryItem.id}`,
      subcategory_description: categoryItem.page_description,
    })
  );
  let thirdMappedResult = mensCategories.categories[2].categories.map(
    (categoryItem) => ({
      imagePath: 'images/' + categoryItem.image,
      name: categoryItem.name,
      idLink: `${process.env.CYCLIC_URL}/womansClothing/${categoryItem.id}`,
      subcategory_description: categoryItem.page_description,
    })
  );

  let mappedResult = {};
  mappedResult.womensClothing = firstMappedResult;
  mappedResult.womensClothing.subcategory_name = "Women's Clothing";
  mappedResult.womensJewelry = secondMappedResult;
  mappedResult.womensJewelry.subcategory_name = "Women's Jewelry";
  mappedResult.womensAccesories = thirdMappedResult;
  mappedResult.womensAccesories.subcategory_name = "women's Accesories";
  let breadcrumbs = [];
  let object1 = {};
  object1.link = `${process.env.CYCLIC_URL}`;
  object1.name = 'Home';
  breadcrumbs.push(object1);
  let object2 = {};
  object2.link = `${process.env.CYCLIC_URL}/womansClothing`;
  object2.name = "Women's Clothing";
  breadcrumbs.push(object2);

  res.render('subCategories', {
    categoryName: "Women's",
    title: 'Robbing City Galati',
    subcategories: mappedResult,
    currentUrl: breadcrumbs,
    clothingCategory: false,
    category_description: mensCategories.page_description,
    womanButton: womansCategoriesButton,
    mensButton: mensCategoriesButton,
    REGISTER_URL: process.env.REGISTER_URL,
  });
});

module.exports = router;
