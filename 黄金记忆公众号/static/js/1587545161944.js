
				//���� �ص�
				siliCallback=function(){
					reachLocation();
				}
				var mapNew;

			 //��ӻ���


						function reachLocation(){

							jsonPost("/carRabTranOrder.do",{status:4,id:MP.id,ddsj:new Date().getTime()},function(data){
								MLog(data);
								if(data.error==0){
									//closeAmap();
									location.href="huo-detail7.html?id="+MP.id;
								}
							});

 						}
 					  callBackInit=function(){
							//��ֹ����
							//appBackFlag=false;
							getSingleData("TranOrderController_1",MP.id,"O_",function(v){
 	 								//showMap(v.fhry,v.fhrx,v.shry,v.shrx,160);
									if(v.islt==2){
										addSilide('�ѵ���ʩ���ص�','�ɹ�ȷ��');
										mapNew = sumPoint(v.cary,v.carx,v.fhry ,v.fhrx ,function(){});
										runMapNavi(v.cary,v.carx,v.fhry ,v.fhrx  );
										$(".jixdahang").click(function(){
										  	runMapNavi(v.cary,v.carx,v.fhry ,v.fhrx  );
										});
									}else{
							  	addSilide('�ѵ���ж���ص㿪ʼж��','�ɹ�ȷ��');
 									mapNew = sumPoint(v.cary,v.carx,0,v.waypoint,function(){});
									runMapNavi(v.fhry ,v.fhrx ,0 ,v.waypoint);
									$(".jixdahang").click(function(){
									  	runMapNavi(v.fhry ,v.fhrx ,0 ,v.waypoint);
									});
								}
							});

						}
						appBack=function(){
						}
				