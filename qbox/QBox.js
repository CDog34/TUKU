var qiniu = require("qiniu");
var config=require("../conf.json");
qiniu.conf.ACCESS_KEY=config.accessKey;
qiniu.conf.SECRET_KEY=config.secretKey;

exports.genPutPolicy=function(filename,cbk){
	if (filename !="" ) {
		filename=":"+filename;
	}
	var PP = new qiniu.rs.PutPolicy(config.bucketName+filename);
	PP.callbackUrl="http://TAT.pics/a/uploadSuccess";
	PP.callbackBody= JSON.stringify({
			"key" :"$(key)",
			"size" : "$(fsize)",
			"w" : "$(imageInfo.width)",
			"h" : "$(imageInfo.height)",
			"hash" : "$(etag)",
			"friname" : "$(x:friname)"
		});
	cbk(PP.token());
	

}

