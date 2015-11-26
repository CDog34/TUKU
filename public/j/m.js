/**
 * Created by CDog on 15/10/8.
 */


var $m=$(".stage");

$(document).on({
    dragleave:function(e){    //拖离
        e.preventDefault();
    },
    drop:function(e){  //拖后放
        e.preventDefault();
    },
    dragenter:function(e){    //拖进
        e.preventDefault();
    },
    dragover:function(e){    //拖来拖去
        e.preventDefault();
    }
});
$m.on('click', function(e) {
    e.preventDefault();
    $('#fu').click();
})

$m.get(0).addEventListener("drop",function(e){
    var data= e.dataTransfer.files;

    if (data.length>1){
        alert("对不起，您只能一次上传个文件");
        return false;
    }

    if(data[0].type.indexOf('image') === -1){
        alert("您选择的不是图片");
        return false;
    }
    $("#msg").html("正在上传，请稍后");

    doUpload("test/"+genName(data[0].name),data[0],function(data){
        if (data.success){
            var nImg=$("<img>");
            nImg.attr("src",data.url);
            nImg.appendTo("#msg");
        }
    });
});
var genName=function(str){
    str=str.replace(/\s/ig,"_");
    return Date.now()+str;
}