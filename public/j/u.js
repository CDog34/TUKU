function doUpload(name,file,cbk,errorCbk){
	var upForm=new FormData();
	upForm.append("file",file);
	upForm.enctype="multipart/form-data";
    $.get("/a/genPP?fname="+name,function(token) {
        upForm.append("token",token);
        upForm.append("key",name);
        upForm.append("x:friname",name);
		$.ajax({
			url: "//up.qbox.me",
			type: "POST",
			data: upForm,
			processData: false,
			contentType: false,
			success:cbk,
			error:errorCbk
		});
    });
}
