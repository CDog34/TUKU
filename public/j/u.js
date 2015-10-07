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

		var qnForm={
			url : upForm.attr("action"),
			enctype : upForm.attr("enctype")
		};
		var fname=$("input[name='x:folder']").val()+((new Date()).valueOf())+getName();
		var friname=$("input[name='x:friname']").val() ? $("input[name='x:folder']").val()+$("input[name='x:friname']").val() : fname;
		$("input[name='x:friname']").val(friname);
		var chd=upForm.children();
		var data={};
		for (var i=0;i<chd.length;i++){
			data[$(chd[i]).attr("name")]=$(chd[i]).val();
		}
		$.get("/a/genPP?fname="+fname,function(token){
			data["token"]=token;
			data["key"]=fname;


			$.ajax({
				type:"POST",
				url:qnForm.url,
				enctype:qnForm.enctype,
				data:data,
				success: function (res) {
					console.log(res);

				}
			})
            
			
		});
		
		return false;
	})
});