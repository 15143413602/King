
			 //���� �ص�
			 siliCallback=function(){
				 reachLocation();
			 }

			//��ӻ���

			 addFindString();
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(v){
						 	if(v.islt==2){
								addSilide('��ʩ���ص�����','ȷ�ϳɹ�');
							}
							else{
								addSilide('��ʼж������','ȷ�ϳɹ�');
							}
						 if(v.payfs==0)
						 href="";
					 });
					 appBackFlag=false;
			 }
			 function reachLocation(){
				if($("#zhpic").val()==""){
					alerts("������");
					return;
				}
				jsonPost("/carRabTranOrder.do",{status:4,id:MP.id,zhpic:$("#ddpic").val(),ddsj:new Date().getTime()},function(data){
					if(data.error==0){
							location.href="huo-detail7.html?id="+MP.id;
					}
			  });
 			}
			appBack=function(){
				//alertMsg("�Ƿ�ȡ��������",function(){
					//			myNoAcepase()
			  //});
			}
		