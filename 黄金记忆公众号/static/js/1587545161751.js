

			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_");
					// appBackFlag=false;
			 }
			 function reachLocation(){
				if($("#zhpic").val()==""){
					alerts("������");
					return;
				}
				jsonPost("/carRabTranOrder.do",{status:3,id:MP.id,zhpic:$("#zhpic").val(),zhsj:new Date().getTime()},function(data){
 					if(data.error==0){
					  	winCloseFinish();
					}
			  });
 			}
			appBack=function(){
				//alertMsg("�Ƿ�ȡ��������",function(){
					//			myNoAcepase()
			  //});
			}
		