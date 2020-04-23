
		 var flagSubmit=false;
		 function submitShqing(){
			  if(flagSubmit){
					if(parseFloat($("input[name='money']").val())>0)
						  saveSql(function(){alerts('申请成功！');getUserInfos();});
						else {

							alerts('没有可开发票金额！');
						}
				}else{
					alerts('请稍后重试！');
					getUserInfos();
				}
				flagSubmit=false;
		 }
			callBackUserInfo=function(user){
				$("input[name='money']").val(new Date().getTime());
 					getSingleData("TranOrderController_28",user.id,"F_",function(data){
									if(data.types==0){
										$("#types1").prop("checked",true);
									}else{
										$("#types2").prop("checked",true);
									}
									flagSubmit=true;
					});
			}
		