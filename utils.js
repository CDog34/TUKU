
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

function areUHttps(referer,cbk){
    if (referer == "") cbk(false);
    if (referer.substr(0,8) == 'https://'){
        cbk(true)
    }else{
        cbk(false)
    }
}

var utils={
	isMyRequest:isMyRequest,
    areUHttps:areUHttps
}


module.exports = utils;