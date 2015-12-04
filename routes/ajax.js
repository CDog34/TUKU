var express = require('express');
var qn = require('../qbox/QBox');
var router = express.Router();
var picture=require("../db/Schema/pictures");
var conf=require("../conf");

/* 生成上传凭证. */
router.get('/genPP', function(req, res) {
  qn.genPutPolicy(req.query.fname,function(token){
    	res.send(token);
	});
});

router.post('/cbk',function(req,res){
	qn.isQiniuCallback(req.header("Authorization"),req.body,function(){
		var newPic=new picture({
			key:req.body.name,
			realAddress:req.body.key,
			canView:true
		});
		newPic.save();
		res.json({"success":true,"url":"/v/"+req.body.name});
	},function(){
		console.log(req.header("Authorization"),req.body);
		res.send("这不好玩！");
	});
	
});
router.get('/cbk',function(req,res){
	res.send("这不好玩！");
});
router.get("/getResent",function(req,res){
	picture.getResent(12,function(err,data){
		if (err){
			console.log(err);
			res.json({
				code:500
			});
			return;
		}
		res.json({
			code:200,
			preDomain:"/v/",
			pics:data
		})
	})
})

module.exports = router;
