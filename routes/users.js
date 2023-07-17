var express = require('express');
var router = express.Router();

const retrieveDocument = async () => {
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://127.0.0.1:27017/shop');
  const ProductModel = require('../models/product');
  return await ProductModel.findOne({ id: '25720078' });
};

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
