
				//���� �ص�
				siliCallback=function(){
					reachLocation();
				}

			 //��ӻ���

						function reachLocation(){
							var myUrl = (location.href+"").replace(/#/ig,"");
							var nowId = myUrl .split("=")[1];
							 jsonPost("/carRabTranOrder.do",{status:2,id:MP.id,zhsj:new Date().getTime()},function(data){
								 if(data.error==0){
										 closeAmap();
										  location.href="huo-detail4.html?id="+nowId;

										/* if(v.payfs==0){
											   location.href="huo-detail4.html?id="+nowId;
										 }else {
										 	   location.href="huo-detail4_1.html?id="+nowId;
										 }*/
								 }
							});
						}
						//��ͼ
						var mapNew;
					  callBackInit=function(){
							//��ֹ����
							appBackFlag=false; 
							getSingleData("TranOrderController_1",MP.id,"O_",function(v){
 	 								//showMap(v.cary,v.carx,v.fhry,v.fhrx,160);
									mapNew = sumPoint(v.cary,v.carx,v.fhry,v.fhrx,function(){});
									$(".jixdahang").click(function(){
 											 runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
									});
									if(v.islt==2){
										addSilide('ʩ���ص�/����','�ɹ�ȷ��');
									}else{
										addSilide('���﷢����/��ʼװ������','�ɹ�ȷ��');
									}
							});

						}
						appBack=function(){
							alertMsg("�Ƿ�ȡ��������",function(){
											myNoAcepase()
						 });
						}
				