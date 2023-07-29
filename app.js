let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let mensClothingRouter = require('./routes/mensClothing');
let subcategoryProductsRouter = require('./routes/subcategoryProducts');
let productRouter = require('./routes/product');
let womansClothingRouter = require('./routes/womansClothing.js');
let registerRouter = require('./routes/register.js');

let app = express();
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

app.use(express.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mensClothing', mensClothingRouter);
app.use('/mensClothing/:id', subcategoryProductsRouter);
app.use('/womansClothing/:id', subcategoryProductsRouter);
app.use('/mensClothing/:id/:productId', productRouter);
app.use('/womansClothing/:id/:productId', productRouter);
app.use('/womansClothing', womansClothingRouter);
app.use('/register', registerRouter);

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
