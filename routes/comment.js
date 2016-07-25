var express = require('express');
var router = express.Router();
var conf=require("../conf.json");
var picture=require("../db/Schema/pictures");
var utils=require("../utils");


router.get('/:pid', function(req, res, next) {
    utils.isMyRequest(req.header('referer'), function (rst) {
        if (rst){
            picture.exist(req.params.pid,function(err,data){
                if (err){
                    console.log(err);
                    res.json({
                        code:500
                    })
                }else{
                    if(data){
                        res.render('comment', { picture: data ,layout:null });
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
        }else{
            next();
        }
    })


});



module.exports = router;
