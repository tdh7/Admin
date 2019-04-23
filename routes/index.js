var express = require('express');
var router = express.Router();

var app_name ="EleFind Administration"
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: app_name });
});
router.get('/danh-sach-san-pham', function(req, res, next) {
  res.render('list-product', { title: app_name });
});

module.exports = router;
