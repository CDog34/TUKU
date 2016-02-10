
var conf=require("./conf.json");


function isMyRequest(referer,cbk){
	var flag=false;
    for (var i in conf.siteMeta.thumbnailReferer){
        if (referer==conf.siteMeta.thumbnailReferer[i]){
        	flag=true;
            break;
        }
    }
    cbk(flag);
}

var utils={
	isMyRequest:isMyRequest
}


module.exports = utils;