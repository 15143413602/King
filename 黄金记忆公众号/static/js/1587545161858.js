
		 var flagSubmit=false;
		 function submitShqing(){
			  if(flagSubmit){
					if(parseFloat($("input[name='money']").val())>0)
						  saveSql(function(){alerts('����ɹ���');getUserInfos();});
						else {

							alerts('û�пɿ���Ʊ��');
						}
				}else{
					alerts('���Ժ����ԣ�');
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
		