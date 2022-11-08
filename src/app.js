require('module-alias/register');

const createHttpError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const router = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', router.userRoutes);
app.use('/client', router.clientRoutes);
app.use('/car', router.carRoutes);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(8000, () =>
  console.log(`
  🚀 Server ready at: http://localhost:8000`)
);

module.exports = server;
