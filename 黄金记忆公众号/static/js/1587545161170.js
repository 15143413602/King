
function changeStatus(obj){
		if(obj.value==1){
			$("#money").parent().parent().show();
			$("#money").val("0");
		}else{
			$("#money").parent().parent().hide();
			$("#money").val("0");
		}
	}
myTopColor="#FFFFFF"; 
 $(".quanxian").append(sendQuanx);
//阿里云上传
 function aliUploadControll(){
	$("#postfiles").trigger("click");
	$("#postfiles2").trigger("click");
 }
 //新文件上传 微信端 
//accept="image/*" 
//accept="video/*" 
//accept="audio/*" 
//accept="image/*" capture="camera" 
//accept="video/*" capture="camera"

$(function(){ 
	var calendardatetime = new lCalendar();
	calendardatetime.init({
		'trigger': '#yytime',
		'type': 'date'
	});
 }); 
 
function finishCallback_time(data){
 $("#passtime").val(new Date(data).getTime());
}
callBackInit = function(){
	if(isAppType==1){ 
		if(MP.type==1){
			addplugsUpload("chose_pic_btn","aui-upload-pic","ossfile","postfiles","image/*","",100);
		}else if(MP.type==2){
			addplugsUpload("upload-video","aui-upload-pic2","ossfile2","postfiles2","video/*","");
		}
	}
	if(MP.public=="true"){
		$("#ispublic").val("1");
		$(".aui-center-title").text("发布到公共圈");
	}
	if(typeof MP.pid!="undefined"&&MP.pid!="undefined"){
		$("#puid").val(MP.pid);
 	}
	if(MP.type==1){
		$(".picflag").show();$("#stype").val(1);
		
	}else if(MP.type==2){
		$(".videoflag").show();$("#isvideo").val(1);
		
	}
	$("#qx").find("option[value='1']").attr("selected",true);
	if(typeof MP.uid!="undefined"){
		$("#userid").val(MP.uid); 
		//$(".qqqqq").hide();
		$(".aui-center-title").text("发布到成员圈");
	}

}
closeWinCallback=function(json){
	if(typeof json=="undefined")return;
	 var list= eval('('+json.value.value+')');
	 MLog(list);
	 //for(var i=0;i<list.length;i++){
		 //console.log(list[i]);
	 //}
	 pushUserList=list.phone;
	 pushUserUidList=list.uid;
	 if(typeof list=="undefined")
	 		$("#tongzhi").val("已选择"+list.length+"人");
	 else{
		 $("#tongzhi").val("已选择"+0+"人");
	 }
}
	$(document).ready(function() {
		var lenInput = $('.textarea-item').val().length;
		$(".textarea-item").keyup(function() {
			lenInput = $(this).val().length;
			/*if (lenInput > 0 && lenInput <= 200) {
				$('.textareaInput').html(lenInput);
				$('.textarea-btn').attr('disabled', false);
			} else {
				$('.textarea-btn').attr('disabled', true);
			}*/
		});
	});
	//字数限制500字

