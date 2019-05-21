const express = require('express');
const router = express.Router();

var Controller = require('../controllers/category_controller');

router.get('/', Controller.home);

router.post('/cap-nhat',Controller.update);

router.get('/sua-thong-tin-:category',Controller.request_edit_or_add);

router.get('/them',Controller.request_edit_or_add);

router.get('/xac-nhan-xoa-:category',Controller.delete);

module.exports = router;