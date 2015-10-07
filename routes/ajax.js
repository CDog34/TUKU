var express = require('express');
var qn = require('../qbox/QBox');
var config = require('../conf.json');
var router = express.Router();

/* 生成上传凭证. */
router.get('/genPP', function(req, res) {
  qn.genPutPolicy(req.query.fname,function(token){
    	res.send(token);
	});
});

router.post('/cbk',function(req,res){
	console.log("收到回调请求");
	qn.isQiniuCallback(req.header("Authorization"),req.body,function(){
		console.log("合法请求");
        console.log(req.body);
		res.json({"success":true,"url":config.siteAddress+"p/"+req.body.name});
	},function(){
		console.log("非法请求");
		res.send("这不好玩！");
	});
	
});
router.get('/cbk',function(req,res){
	res.send("这不好玩！");
});

module.exports = router;
