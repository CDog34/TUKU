/**
 * Created by CDog on 15/10/8.
 */


var $m=$(".stage");
var $imgList=$("#image-list");
var origWord=$("#msg").html();
var $msg=$("#msg");
var $popup=$(".popup-gray");
var $cpyMsg=$(".pic-detail .msg");
var $bomBtn=$('#btn-load-more');
var $comment=$('iframe#comment');
var loadMoreText='嗯...我还要...更多...';
var loadingText='努力加载中>_<';
var curPage=-1;
var $cmtOpener=$('.comment-opener');
var $cmtWrapper=$('.comment-wrapper')

$(".btn.btn-close").click(function () {
    $cmtWrapper.removeClass('cmt-show')
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
    $(".pic-detail img").attr("src", window.location.origin+$(e.target).data('url')+"?do_redirect");
    $(".pic-detail p span").html(window.location.origin+$(e.target).data('url'));
    $(".btn.btn-cpy").attr("data-clipboard-text",window.location.origin+$(e.target).data('url'));
    $(".btn-open").attr("href",(window.location.origin+$(e.target).data('url')) + "?no_thumbnail");
    $comment.attr('src',"/c/"+$(e.target).data('id'));
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
    if (uploadBusy) return;
    $('#fu').click();

})


function checkFiles(data){
    if (data.length == 0) return false;
    if (data.length > 10) {
        alert('一次至多上传10张图片哦');
        return false;
    }
    var flag=true;
    for (var i in data){
        if (parseInt(i) != i ) break;
        if(data[i].type.indexOf('image') === -1){
            flag=false;
            alert('噫...貌似有奇怪的东西混进去了')
            break;
        }
    }
    return flag;
}

var uploadBusy=false;

var doUpdate=function(picList){
    if ( !checkFiles(picList) || uploadBusy)return;
    uploadBusy=true;
    function uploadWrapper(curPic){
        $msg.html("正在上传第"+(curPic+1)+"/"+picList.length+"张图片,请稍后");
        doUpload(genName(picList[curPic].name),picList[curPic],function(data){
            if (data.success){
                $("<a>")
                    .attr({href:data.url,'data-id':data.id,'data-url':data.url})
                    .append(
                        $("<img>")
                            .attr({src:data.url+'?do_redirect','data-id':data.id,'data-url':data.url})
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
            if (curPic<picList.length-1){
                uploadWrapper(++curPic);
            }else{
                uploadBusy=false;
                $msg.html("上传成功");
                setTimeout("$msg.html(origWord)",2000);
            }

        },function(e){
            uploadBusy=false;
            $msg.html("呜呜呜出错了呢，请联系作者邮箱：i#cdog.me");
            setTimeout("$msg.html(origWord)",2000);
        });
    }
    uploadWrapper(0);
};


$m.get(0).addEventListener("drop",function(e){
    doUpdate(e.dataTransfer.files);


});
var genName=function(str){
    str=str.replace(/[\s\(\)%]/ig,"_");
    return Date.now()+str;
};
$bomBtn.click(doLoadMore);

function doLoadMore(){
    $bomBtn.html(loadingText);
    $.get("/a/indexPics/"+(++curPage),function(data){
        if (data.code==200){
            $bomBtn.html(loadMoreText);
            var d=data.pics;
            for (i in d){
                $("<a>")
                    .attr({href:data.preDomain+d[i].realAddress,'data-id':d[i]._id,'data-url':data.preDomain+d[i].realAddress})
                    .append(
                    $("<img>")
                        .attr({src:data.preDomain+d[i].realAddress+'?do_redirect','data-id':d[i]._id,'data-url':data.preDomain+d[i].realAddress})
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
}

function toggleCmt(){
    $cmtWrapper.toggleClass('cmt-show');
}

$(function(){
    doLoadMore();
    $cmtOpener.click(toggleCmt)
})