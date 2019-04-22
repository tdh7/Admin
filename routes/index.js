var express = require('express');
var router = express.Router();

var app_name ="EleFind Administration"
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: app_name });
});

module.exports = router;
