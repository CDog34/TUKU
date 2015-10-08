var express = require('express');
var qn = require('../qbox/QBox');
var config = require('../conf.json');
var router = express.Router();
var picture=require("../db/Model/picture");

/* 生成上传凭证. */
router.get('/genPP', function(req, res) {
  qn.genPutPolicy(req.query.fname,function(token){
    	res.send(token);
	});
});

router.post('/cbk',function(req,res){
	qn.isQiniuCallback(req.header("Authorization"),req.body,function(){
		picture.addOne({
			key:req.body.name,
			realAddress:req.body.key,
			picView:0
		});
		res.json({"success":true,"url":config.siteAddress+"v/"+req.body.name});
	},function(){
		res.send("这不好玩！");
	});
	
});
router.get('/cbk',function(req,res){
	res.send("这不好玩！");
});

module.exports = router;
