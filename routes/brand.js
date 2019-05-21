const express = require('express');
const router = express.Router();

var Controller = require('../controllers/brand_controller');

router.get('/', Controller.home);


//router.get('/:brand', Controller.detail);

router.post('/cap-nhat',Controller.update);

router.get('/sua-thong-tin-:brand',Controller.request_edit_or_add);

router.get('/them',Controller.request_edit_or_add);

router.get('/xac-nhan-xoa-:brand',Controller.delete);

module.exports = router;