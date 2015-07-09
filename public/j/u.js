$(function(){


	function getName(){
		var myFile = $("#file").val();
		var length = myFile.length;
		var x = myFile.lastIndexOf("\\");
		x++; 
		var fileName = myFile.substring(x,length); 
		console.log(fileName);
		return fileName;
	}

	var upForm=$("#tkUpload");
	upForm.submit(function(){
		console.log(upForm);
		
		var qnForm=$("<form />");
		qnForm.attr({
			method : upForm.attr("method"),
			action : upForm.attr("action"),
			enctype : upForm.attr("enctype"),
		});
		fname=$("input[name='x:folder']").val()+((new Date()).valueOf())+getName();
		var friname=$("input[name='x:friname']").val() ? $("input[name='x:folder']").val()+$("input[name='x:friname']").val() : fname;
		$("input[name='x:friname']").val(friname);
		var chd=upForm.children();
		for (var i=0;i<chd.length;i++){
			qnForm.append($(chd[i]).removeAttr("id"));
		}
		$.get("/a/genPP?fname="+fname,function(token){
			qnForm.append($("<input>").attr({
				name : "token",
				value : token,
			}));
			qnForm.append($("<input>").attr({
				name : "key",
				value : fname,
			}));
			console.log(qnForm);

			qnForm.submit();
            
			
		});
		
		return false;
	})
});