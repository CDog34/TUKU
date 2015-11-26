function doUpload(name,file,cbk){
	var upForm=new FormData();
	upForm.append("file",file);
	upForm.enctype="multipart/form-data";
    $.get("/a/genPP?fname="+name,function(token) {
        upForm.append("token",token);
        upForm.append("key",name);
        upForm.append("x:friname",name);
		$.ajax({
			url: "http://upload.qiniu.com",
			type: "POST",
			data: upForm,
			processData: false,
			contentType: false,
			success:cbk
		});
    });
}
