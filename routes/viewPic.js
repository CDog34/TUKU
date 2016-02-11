var express = require('express');
var router = express.Router();
var conf=require("../conf.json");
var picture=require("../db/Schema/pictures");
var utils=require("../utils");


router.get('/*', function(req, res) {
    utils.isMyRequest(req.header("referer"),function(rst){
        var str = rst ? conf.qiniu.thumbnail : "";
        picture.view(req.params[0],function(err,data){
            if (err){
                console.log(err);
                res.json({
                    code:500
                })
            }else{
                if(data){
                    utils.areUHttps(req.header('referer'), function (isHttps) {
                        res.redirect((isHttps ? conf.qiniu.httpsAddress : conf.qiniu.httpAddress)+data.key+str);
                    })

                }else{
                    res.status(404).render('error', {
                        title:"出错了_(:з」∠)_",
                        message: "没有找到你请求的图片",
                        error: {status:404,
                        stack:"是不是天然呆搞错啦TAT"},
                        meta:conf.siteMeta
                    });
                }
            }
        });
        //res.redirect(conf.qiniu.qnAddress+req.params[0]);
        //res.send("你请求的地址为："+req.params[0]);
    })

    
});



module.exports = router;
