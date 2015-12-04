var express = require('express');
var router = express.Router();
var conf=require("../conf.json");
var picture=require("../db/Schema/pictures");


router.get('/*', function(req, res) {
    var str="";
    for (var i in conf.siteMeta.thumbnailReferer){
        if (req.header("referer")==conf.siteMeta.thumbnailReferer[i]){

            str=conf.qiniu.thumbnail;
            break;
        }
    }

    picture.view(req.params[0],function(err,data){
        if (err){
            console.log(err);
            res.json({
                code:500
            })
        }else{
            if(data){
                res.redirect(conf.qiniu.qnAddress+data.realAddress+str);
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
});



module.exports = router;
