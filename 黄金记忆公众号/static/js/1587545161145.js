
	function contackUs(){
		saveData(function(data){
		if(typeof MP.id !="undefined"){
			alerts("�޸ĳɹ���");
			closeOpenNewWin();
		}else{
			if($("#islink").find("option:selected").val()==0){
				 getSqlData("selectUserNameExit","",[$("#phone").val()],function(data){
					//������Ϣ
					var id =data.data.id;
					sendRegMsg("("+id+")","��"+userInfo.name+"�� ���㷢���������룡",2);
				 });
			 }else{
			 
			 }
		}
			 
		});
	}
	myTopColor="#FFFFFF";
	function changeStatus(obj){
		if(obj.value==1){
			$("#pass").parent().show();
			$("#pass").val("");
		}else{
			$("#pass").parent().hide();
			$("#pass").val("123456");
		}
	}
	if(isAppType==1){
		addplugsUpload("chose_pic_btn","aui-upload-pic","ossfile","postfiles","image/*","",1,true);
    }
	$("#phone").blur(function(){
		 getSingleData("HomeController_16",$(this).val(),"C",function(data){
			 	if(data){
					$("#pid").val(data.id);
					
				}
		 });
	});
	callBackInit=function(){
			 getNewData("HomeController_1",{newApi:true},function(data){
				  $.each(data.data,function(k,v){
						if(MP.bid==v.id){
						 $("#bid").append('<option value="'+v.id+'" selected>'+v.title+'</option>');
						 $("#bid").parent().hide();
						}else{
						 $("#bid").append('<option value="'+v.id+'">'+v.title+'</option>');
						}
					 	
					});
					
					if(typeof MP.position!="undefined"){
						$("#position").val(MP.position); 
						$("#isadd").find("option[value='1']").attr("selected",true);
					}
					if(typeof MP.id !="undefined"){
						$(".aui-center-title").text("�޸ļҳ�Ա��Ϣ");
						getSingleData("HomeController_2_2",MP.id,"H_",function(data){
								$("#status").find("option[value='"+data.status+"']").attr("selected",true);
								if(data.status==0){
									$("#pass").parent().hide();
									$("#pass").val("123456");
								}
								$("#bid").find("option[value='"+data.bid+"']").attr("selected",true);
								$("#isadd").find("option[value='"+data.isadd+"']").attr("selected",true);
								if($("#chose_pic_btn").length>0){ 
									$("#chose_pic_btn").css("background-image","url("+data.pic+")");
									$("#chose_pic_btn").css("background-size","100% 100%");
								}
								$("#loginForm").append('<input type="hidden" name="id" id="id"   value="'+data.id+'"  >');
								$(".aui-tabBar-item-text").html("�޸���Ϣ");
								$("#col_noform").remove();
								$("#uid_noform").remove();
								$("#reuse_noform").remove();
								
								//$("#name").attr("readonly","readonly");
								//$("#phone").attr("readonly","readonly");
						}); 
					}

			 });
	}
	