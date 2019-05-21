const express = require('express');
const router = express.Router();

var productController = require('../controllers/product_controller');

router.get('/', productController.home);
router.get('/danh-sach-san-pham-theo-loai', productController.home);
router.get('/danh-sach-san-pham', productController.home);
router.get('/toan-bo-san-pham', productController.home);


router.get('/xem-chi-tiet-:category-:productId', productController.product_detail);
router.post('/cap-nhat',productController.update_product);
router.get('/sua-thong-tin-:category-:productId',productController.request_edit_or_add_product);
router.get('/them-san-pham',productController.request_edit_or_add_product);
router.get('/xac-nhan-xoa-:category-:productId',productController.delete_product);

module.exports = router;