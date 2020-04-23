 
	myTopColor="#FFFFFF";
	function changeReplace(obj){
		if(obj.value==1){
 			$(".guanjianci").show();
		}else{
 			$(".guanjianci").hide();
		}
	}  
	function changeStatus(obj){
		if(obj.value==1){
			$("#money").attr("placeholder","请输入收费标准为每百字（    ）元");
			$(".shoufei").text( "请输入收费标准为每百字（    ）元");
		}else{
			$("#money").attr("placeholder","收费金额");
			$(".shoufei").text( "收费金额");
		}
	}  
	callBackInit=function(){ 
		if(isNull(MP.show)){
		
		}else{
			$("#iscost").val("0");
			$(".selectMoney").remove();
		}
		$("#id").val(MP.id);
	}
	