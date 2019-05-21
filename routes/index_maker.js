const express = require('express');
const router = express.Router();

var Controller = require('../controllers/index_maker_controller');

router.get('/', Controller.home);

router.post('/cap-nhat',Controller.update);

module.exports = router;