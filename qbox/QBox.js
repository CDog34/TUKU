var qiniu = require("qiniu");
var config=require("../conf.json");
var crypto=require("crypto");
qiniu.conf.ACCESS_KEY=config.accessKey;
qiniu.conf.SECRET_KEY=config.secretKey;

exports.genPutPolicy=function(filename,cbk){
	console.log(config.siteAddress);
	if (filename !="" ) {
		filename=":"+filename;
	}
	var PP = new qiniu.rs.PutPolicy(config.bucketName+filename);
	PP.callbackUrl=config.siteAddress+"a/cbk";
	PP.callbackBody="name=$(x:friname)&hash=$(etag)&key=$(key)";
	PP.returnBody= JSON.stringify({
			"key" :"$(key)",
			"size" : "$(fsize)",
			"w" : "$(imageInfo.width)",
			"h" : "$(imageInfo.height)",
			"hash" : "$(etag)",
			"friname" : "$(x:friname)"
		});
	cbk(PP.token());
	

}

function getRawBody(body){
	var rst="";
	var dot="";
	for (var key in body){
		rst=rst+dot+encodeURIComponent(key)+"="+encodeURIComponent(body[key]);
		dot="&";
	}
	return rst;
}

exports.isQiniuCallback=function(aStr,body,successCbk,failCbk){
	if ( aStr == undefined || body == undefined ||aStr.substring(0,aStr.indexOf(" ")) != "QBox") {
		failCbk();
		return;
	}
	var params=aStr.substring(aStr.indexOf(" ")+1).split(":");
	if (params.length != 2 || params[0] != config.accessKey){
		failCbk();
		return;
	}
	var data="/a/cbk\n"+getRawBody(body);
	data=crypto.createHmac('sha1', config.secretKey).update(data).digest().toString("base64").replace(/\+/ig,"-").replace(/\//ig,"_");
	if (data===params[1]){
		successCbk();
	}else{
		failCbk();
	}
}
