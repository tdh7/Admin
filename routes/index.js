var express = require('express');
var router = express.Router();
const passport = require('passport');

var IndexController = require('../controllers/index_controller');

var ManageAccountController =require('../controllers/account/manageaccount');
var EditAccountController = require('../controllers/account/editaccount');
var ChangeInfoProductController = require('../controllers/product/change-info-product');
var EcommerceProductSingleController = require('../controllers/product/ecommerce-product-single');
var OrderManagementController = require('../controllers/order/order-management');
var SalesController = require('../controllers/sales/sales');
var TopTenSalesController = require('../controllers/top10/toptensales');
var TopTenCategoryController = require('../controllers/top10/toptencategory');

router.get('/',IndexController.home);

router.get('/dang-nhap',IndexController.signInGet);
router.get('/dang-ky',IndexController.registerGet);

router.post('/dang-nhap',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/dang-nhap'
}));

router.post('/dang-ky',IndexController.registerPost);
router.get('/dang-xuat',IndexController.logout);

router.get('/quen-mat-khau', IndexController.accountRecovery);

router.get('/quan-ly-tai-khoan',ManageAccountController.manageaccount);
router.get('/thay-doi-thong-tin-tai-khoan',EditAccountController.editaccount);
router.get('/thay-doi-thong-tin-san-pham',ChangeInfoProductController.changeinfoproduct);
router.get('/chi-tiet-san-pham',EcommerceProductSingleController.ecommerceproductsingle);
router.get('/quan-ly-don-dat-hang',OrderManagementController.ordermanagement);
router.get('/doanh-so',SalesController.sales);
router.get('/top-10-san-pham',TopTenSalesController.toptensales);
router.get('/top-10-danh-muc',TopTenCategoryController.toptencategory);

module.exports = router;