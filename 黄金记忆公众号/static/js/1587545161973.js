
				//���� �ص�
				siliCallback=function(){
					reachLocation();
				}

			 //��ӻ���
       addFindString();
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(v){
						 if(v.islt==2)
						 addSilide('ʩ�����','ȷ�ϳɹ�');
						 else{
							 addSilide('ж�����','ȷ�ϳɹ�');
						 }
					 });
					 //appBackFlag=false;
			 }
			 function reachLocation(){
				if($("#xzwpic").val()==""){
					alerts("������");
					return;
				}
				jsonPost("/carRabTranOrder.do",{status:5,id:MP.id,zhpic:$("#xzwpic").val(),xzwsj:new Date().getTime()},function(data){
					if(data.error==0){
							location.href="huo-detail9.html?id="+MP.id;
					}
			  });
 			}
			appBack=function(){
				//alertMsg("�Ƿ�ȡ��������",function(){
					//			myNoAcepase()
			  //});
			}
		