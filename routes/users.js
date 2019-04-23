var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/danh-sach-san-pham', function(req, res, next) {
  res.send('xem danh sach');
});

module.exports = router;
