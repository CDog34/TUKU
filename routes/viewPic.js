var express = require('express');
var router = express.Router();
var conf=require("../conf.json");


router.get('/*', function(req, res) {
    res.redirect(conf.qnAddress+req.params[0]);
    //res.send("你请求的地址为："+req.params[0]);
});



module.exports = router;
