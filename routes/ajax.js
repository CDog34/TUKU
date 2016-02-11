var express = require('express');
var qn = require('../qbox/QBox');
var router = express.Router();
var picture=require("../db/Schema/pictures");
var conf=require("../conf");
var utils=require("../utils");

/* 生成上传凭证. */
router.get('/genPP', function(req, res, next) {
	utils.isMyRequest(req.referrer,function(rst){
		if (rst){
			qn.genPutPolicy(req.query.fname,function(token){
				res.send(token);
			});
		}else{
			next();
		}
	})

});

router.post('/cbk',function(req,res,next){
	qn.isQiniuCallback(req.header("Authorization"),req.body,function(){
		var newPic=new picture({
			key:req.body.name,
			realAddress:req.body.key,
			canView:true
		});
		newPic.save(function(err,data){
			if(err){
				console.log(err);
				res.json({code:500,msg:'保存错误'});
				return;
			}
			res.json({"success":true,"url":"/v/"+req.body.name,id:data._id});
		});

	},function(){
		console.log(req.header("Authorization"),req.body);
		next();
	});
	
});
router.get("/indexPics/:num",function(req,res,next){
	utils.isMyRequest(req.header("referer"),function(rst){
		if (rst){
			if (page=parseInt(req.params.num) != req.params.num){
				res.json({
						code:500,
						msg:'params error'
					});
				return;
			}
			picture.getResent(parseInt(req.params.num)*20,20,function(err,data){
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
		}
		else{
			next()
		}
	})
	
})

module.exports = router;
