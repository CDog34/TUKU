var express = require('express');
var qn = require('../qbox/QBox');
var router = express.Router();

/* 生成上传凭证. */
router.get('/genPP', function(req, res) {
  qn.genPutPolicy(req.query.fname,function(token){
    	res.send(token);
	});
});

module.exports = router;
