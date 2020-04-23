
			callBackUserInfo=function(user){
 					getSingleData("TranOrderController_28",user.id,"F_",function(data){
									if(data.types==0){
										$("#types1").prop("checked",true);
									}else{
										$("#types2").prop("checked",true);
									}
					});
			}
		