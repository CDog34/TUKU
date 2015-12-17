/**
 * Created by CDog on 15/10/8.
 */


var $m=$(".stage");
var $imgList=$("#image-list");
var origWord=$("#msg").html();
var $msg=$("#msg");
var $popup=$(".popup-gray");
var $cpyMsg=$(".pic-detail .msg");

$(".btn.btn-close").click(function () {
    $cpyMsg.fadeOut();
    $popup.fadeOut();
})



var clip = new ZeroClipboard($(".btn.btn-cpy")[0], {
    moviePath: "ZeroClipboard.swf"
} );
clip.on('aftercopy', function(event) {
    $cpyMsg.html("复制成功");
    $cpyMsg.fadeIn();
} );
clip.on('error', function(event) {
    $cpyMsg.html("复制错误,请手动复制");
    $cpyMsg.fadeIn();
} );



function showDetail(e){
    $(".pic-detail img").attr("src", e.target.src || e.target.href);
    $(".pic-detail p span").html(e.target.src || e.target.href);
    $(".btn.btn-cpy").attr("data-clipboard-text",e.target.src || e.target.href);
    $popup.fadeIn();
}

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
$('#fu').on('change', function (e) {
    doUpdate($("#fu").prop('files'));

})
$m.on('click', function(e) {
    e.preventDefault();
    $('#fu').click();

})

var doUpdate=function(data){
    if (data.length>1){
        alert("对不起，您只能一次上传个文件");
        return false;
    }

    if(data[0].type.indexOf('image') === -1){
        alert("您选择的不是图片");
        return false;
    }
    $msg.html("正在上传，请稍后");

    doUpload(genName(data[0].name),data[0],function(data){
        if (data.success){
            $("<a>")
                .attr('href',data.url)
                .append(
                    $("<img>")
                        .attr("src",data.url)
                        .addClass("image-item").load(function (e) {
                        $(e.target).addClass("show");
                    })

                )
                .addClass("a-wrapper")
                .click(function(e){
                    e.preventDefault();
                    showDetail(e);
                })
                .prependTo($imgList)
        }
        $msg.html("上传成功");
        setTimeout("$msg.html(origWord)",2000);
    });
}

$m.get(0).addEventListener("drop",function(e){
    doUpdate(e.dataTransfer.files);


});
var genName=function(str){
    str=str.replace(/[\s\(\)%]/ig,"_");
    return Date.now()+str;
};


$(function(){
    $.get("/a/getResent",function(data){
        if (data.code==200){
            var d=data.pics;
            for (i in d){
                $("<a>")
                    .attr({href:data.preDomain+d[i].realAddress,target:"_blank"})
                    .append(
                    $("<img>")
                        .attr('src',data.preDomain+d[i].realAddress)
                        .addClass("image-item").load(function (e) {
                        $(e.target).addClass("show");
                    })

                    )
                    .addClass("a-wrapper")
                    .click(function(e){
                        e.preventDefault();
                        showDetail(e);
                    })
                    .appendTo($imgList)
            }
        }
    })
})