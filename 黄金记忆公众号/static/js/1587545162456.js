 
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
			$("#money").attr("placeholder","�������շѱ�׼Ϊÿ���֣�    ��Ԫ");
			$(".shoufei").text( "�������շѱ�׼Ϊÿ���֣�    ��Ԫ");
		}else{
			$("#money").attr("placeholder","�շѽ��");
			$(".shoufei").text( "�շѽ��");
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
	