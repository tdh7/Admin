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
router.get('/thay-doi-thong-tin-san-pham', function(req, res, next) {
  res.render('change-info-product', { title: app_name });
});
router.get('/chi-tiet-san-pham', function(req, res, next) {
  res.render('ecommerce-product-single', { title: app_name });
});
module.exports = router;
