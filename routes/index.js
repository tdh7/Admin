var express = require('express');
var router = express.Router();

/*
var app_name ="EleFind Administration"
// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: app_name });
});

router.get('/quan-ly-don-dat-hang', function(req, res, next) {
  let status = req.query.trangthai;
  let cartpage ='order-management'
  console.log(status);
  res.render(cartpage, { title: app_name ,trangthai:status});
});

router.get('/doanh-so',function (req,res,next) {
  let optionalStyleSheet = '<link href="vendor/datepicker/tempusdominus-bootstrap-4.css" rel="stylesheet">">';
  let optionalJavaScript = '<script src="vendor/datepicker/moment.js"></script>\n' +
      '<script src="vendor/datepicker/tempusdominus-bootstrap-4.js"></script>\n' +
      '<script src="vendor/datepicker/datepicker.js"></script>';
  res.render('sales',{title:"Doanh số",optionalStyleSheet:optionalStyleSheet,optionalJavaScript:optionalJavaScript});
});

router.get('/top-10-san-pham',function (req,res,next) {
  res.render('toptensales',{title:'Top 10 sản phẩm'});
});

router.get('/top-10-danh-muc',function (req,res,next) {
  res.render('toptencategory',{title:'Top 10 danh mục'});
})


router.get('/quan-ly-tai-khoan',function (req,res,next) {
  res.render('manageaccount',{title:'Quản lý tài khoản'});
})

router.get('/thay-doi-thong-tin-tai-khoan',function (req,res,next) {
  res.render('editaccount',{title:'Thay đổi thông tin tài khoản'});
})
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

*/

var IndexController = require('../controllers');

var ManageAccountController =require('../controllers/account/manageaccount');
var EditAccountController = require('../controllers/account/editaccount');
var ListProductController = require('../controllers/booth/list-product');
var ChangeInfoProductController = require('../controllers/booth/change-info-product');
var EcommerceProductSingleController = require('../controllers/booth/ecommerce-product-single');
var OrderManagementController = require('../controllers/order/order-management');
var SalesController = require('../controllers/sales/sales');
var TopTenSalesController = require('../controllers/top10/toptensales');
var TopTenCategoryController = require('../controllers/top10/toptencategory');

router.get('/',IndexController.home);

router.get('/quan-ly-tai-khoan',ManageAccountController.manageaccount);
router.get('/thay-doi-thong-tin-tai-khoan',EditAccountController.editaccount);
router.get('/danh-sach-san-pham',ListProductController.listproduct);
router.get('/thay-doi-thong-tin-san-pham',ChangeInfoProductController.changeinfoproduct);
router.get('/chi-tiet-san-pham',EcommerceProductSingleController.ecommerceproductsingle);
router.get('/quan-ly-don-dat-hang',OrderManagementController.ordermanagement);
router.get('/doanh-so',SalesController.sales);
router.get('/top-10-san-pham',TopTenSalesController.toptensales);
router.get('/top-10-danh-muc',TopTenCategoryController.toptencategory);

module.exports = router;