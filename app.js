var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mensClothingRouter = require('./routes/mensClothing');
var subCategoryProductsRouter = require('./routes/mensSubcategoryProducts');
var productRouter = require('./routes/product');
var womansClothingRouter = require('./routes/womansClothing.js');

var app = express();
const exphbs = require('express-handlebars');

// view engine setup
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    defaultLayout: false,
    partialsDir: path.join(__dirname, 'views/partials'), // Specify the path to the partials directory
  })
);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(`/${process.env[CYCLIC_URL]}/mensClothing`, mensClothingRouter);
app.use('/mensClothing/:id', subCategoryProductsRouter);
app.use('/womansClothing/:id', subCategoryProductsRouter);
app.use('/mensClothing/:id/:productId', productRouter);
app.use('/womansClothing/:id/:productId', productRouter);
app.use('/womansClothing', womansClothingRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
