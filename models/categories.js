const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  categories: [
    {
      categories: [
        {
          id: { type: String },
          image: { type: String },
          name: { type: String },
          page_description: { type: String },
          page_title: { type: String },
          parent_category_id: { type: String },
          c_showInMenu: { type: Boolean },
        },
      ],
    },
  ],
});

const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;
