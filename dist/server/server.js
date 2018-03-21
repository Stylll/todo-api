'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _route = require('./server/routes/route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = parseInt(process.env.port, 10) || 3000;

// Middleware
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// Routes
/* GET home page. */
app.get('/', function (req, res) {
  res.status(200).send({ message: 'Welcome to TODO' });
});

(0, _route2.default)(app);

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('app running on localhost:' + port);
  }
});

exports.default = app;