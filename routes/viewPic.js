var express = require('express');
var router = express.Router();


router.get('/*', function(req, res) {
    res.send("你请求的地址为："+req.params[0]);
});



module.exports = router;