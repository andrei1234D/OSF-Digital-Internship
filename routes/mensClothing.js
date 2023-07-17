var express = require('express');
var router = express.Router();

let uri =
  'mongodb+srv://balasandrei200:9pUu1Pki0jTZJs2x@cluster0.zram96h.mongodb.net/shop_db';
const retrieveDocument = async () => {
  var mongoose = require('mongoose');
  mongoose.connect(uri);
  const CategoriesModel = require('../models/categories');
  return await CategoriesModel.findOne({ name: 'Mens' });
};
/* GET users listing. */
router.get('/', async function (req, res, next) {
  const mensCategories = await retrieveDocument();
  console.log(mensCategories);
  //2 mappings to add the image paths and the names of thee subcategories and link id's
  let firstMappedResult = mensCategories.categories[0].categories.map(
    (categoryItem) => ({
      imagePath: 'images/' + categoryItem.image,
      name: categoryItem.name,
      idLink: `http://localhost:3000/mensClothing/${categoryItem.id}`,
    })
  );
  let secondMappedResult = mensCategories.categories[1].categories.map(
    (categoryItem) => ({
      imagePath: 'images/' + categoryItem.image,
      name: categoryItem.name,
      idLink: `http://localhost:3000/mensClothing/${categoryItem.id}`,
    })
  );

  let mappedResult = {};
  mappedResult.mensClothing = firstMappedResult;
  mappedResult.mensClothing.subcategory_name = 'Mens Clothing';
  mappedResult.mensAccessories = secondMappedResult;
  mappedResult.mensAccessories.subcategory_name = 'Mens Accesories';
  let link = req.protocol + '://' + req.get('host') + req.originalUrl;
  let breadcrumbs = [];

  console.log(mappedResult);

  if ('http://localhost:3000/mensClothing/' === link) {
    let object1 = {};
    object1.link = 'http://localhost:3000';
    object1.name = 'Home';
    breadcrumbs.push(object1);
    let object2 = {};
    object2.link = 'http://localhost:3000/mensClothing';
    object2.name = 'Mens Clothing';
    breadcrumbs.push(object2);
  }
  res.render('subCategories', {
    categoryName: 'Mens',
    title: 'Robbing City Galati',
    subcategories: mappedResult,
    currentUrl: breadcrumbs,
    clothingCategory: true,
  });
});

module.exports = router;
