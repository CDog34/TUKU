var express = require('express');
var router = express.Router();
var conf=require("../conf.json");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { meta: conf.siteMeta });
});

module.exports = router;
