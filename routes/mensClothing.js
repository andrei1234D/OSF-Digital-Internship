let express = require('express');
let router = express.Router();
require('dotenv').config();

let uri = process.env.API_KEY;
const retrieveDocument = async () => {
  let mongoose = require('mongoose');
  mongoose.connect(uri);
  const CategoriesModel = require('../models/categories');
  return await CategoriesModel.findOne({ name: 'Mens' });
};
/* GET users listing. */
let womansCategoriesButton = process.env.CYCLIC_URL + '/womansClothing';
let mensCategoriesButton = process.env.CYCLIC_URL + '/mensClothing';

router.get('/', async function (req, res, next) {
  const mensCategories = await retrieveDocument();
  //2 mappings to add the image paths and the names of thee subcategories and link id's
  let firstMappedResult = mensCategories.categories[0].categories.map(
    (categoryItem) => ({
      imagePath: 'images/' + categoryItem.image,
      name: categoryItem.name,
      idLink: `${process.env.CYCLIC_URL}/mensClothing/${categoryItem.id}`,
      subcategory_description: categoryItem.page_description,
    })
  );
  let secondMappedResult = mensCategories.categories[1].categories.map(
    (categoryItem) => ({
      imagePath: 'images/' + categoryItem.image,
      name: categoryItem.name,
      idLink: `${process.env.CYCLIC_URL}/mensClothing/${categoryItem.id}`,
      subcategory_description: categoryItem.page_description,
    })
  );
  let mappedResult = {};
  mappedResult.mensClothing = firstMappedResult;
  mappedResult.mensClothing.subcategory_name = "Men's Clothing";
  mappedResult.mensAccessories = secondMappedResult;
  mappedResult.mensAccessories.subcategory_name = "Men's Accessories";

  const createObjectBreadcrumb = (object, link, name) => {
    object = {};
    object.link = link;
    object.name = name;
    return object;
  };

  let breadcrumbs = [];

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
  res.render('subCategories', {
    categoryName: "Men's",
    title: 'Robbing City Galati',
    subcategories: mappedResult,
    currentUrl: breadcrumbs,
    clothingCategory: true,
    category_description: mensCategories.page_description,
    womanButton: womansCategoriesButton,
    mensButton: mensCategoriesButton,
    REGISTER_URL: process.env.REGISTER_URL,
  });
});

module.exports = router;
