
				//���� �ص�
				siliCallback=function(){
					myNaiToAddr(true);
				}

			 //��ӻ���
			 addSilide('ǰ��������','��ʼ����');
			 addFindString();
			 var mysetInte;
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
						//�ϼƷ��ü���
						$(".heji").text('�ϼƣ�'+sumAllMoney(data));
						if(data.islt!=2){
							pushContent(MP.id, orderInfo.xuid,"�����ȴ���֧������",function(data){
								//location.href="huo-detail2.html?id="+MP.id;
							});
							$(".jl").show();
						 	   var jdsj=parseInt(data.jdsj)+payCarTime*60*1000;
									mysetInte=setInterval(function(){
											var now=new Date().getTime();
										countTime(now,jdsj,function(dt){
												 $(".jl").html("���ѵ���ʱ��"+dt);

												 if(dt==""){
													     clearInterval(mysetInte);
			 											  	myNoAcepase();
												 }
										});
									},1000);
									//����״̬����
									mypayCheck=setInterval(function(){
										   myNaiToAddr(false);
									},4000);
									if(data.payfs==1&&data.islt!=2){
											clearInterval(mysetInte);
										//	$(".jl").val("�û��Ѿ����");
											clearInterval(mypayCheck);
											location.href="map.html?id="+MP.id;
											//��ʼ����
											runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
									}else{

									}
						}
					});
					 //��ֹ����
					 //appBackFlag=false;
					 //����ʱ
			 }
			 var mypayCheck;
			 //�û�����״̬
			 var paystatus=false;
			 //��ȡ�����Ƿ񸶿�
			 function myNaiToAddr(flag){

					 getNewData("TranOrderController_1",{newApi:true,param:"{'p1':"+MP.id+"}"},function(data){
							 if(data.res==0){

								  var v = data.data[0];
									if(v.islt!=2&&v.payfs==0){
						    if(v.payfs==1){
											clearInterval(mysetInte);
										//	$(".jl").val("�û��Ѿ����");
											clearInterval(mypayCheck);
											location.href="map.html?id="+MP.id;
											//��ʼ����
											runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
									} else if(v.paystatus==2){

										 clearInterval(mysetInte);
										 $(".jl").val("�û��Ѿ����");
										 clearInterval(mypayCheck);
										 runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
										 jsonPost("/carRabTranOrder.do",{ status:v.status, id:MP.id,jdsj:new Date().getTime()},function(data){
						  					if(data.error==0){
													//��תҳ��
 												     location.href="map.html?id="+MP.id;
						 				  	}
						 			  });
										 //��ʼ����
										 //runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
									 }else{
										 if(flag){
											 alertMsg("����δ���˷ѣ�ϵͳ�����⳥�������Ƿ�ȷ�ϣ�",function(){
 												clearInterval(mysetInte);
											//	$(".jl").val("�û��Ѿ����");
												clearInterval(mypayCheck);
												location.href="map.html?id="+MP.id;
												//��ʼ����
												runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
											});
									}
								}
							}else{
										location.href="map.html?id="+MP.id;
										//��ʼ����
										runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
									}
							 }
					 },true);

			 }
			 appBack=function(){
				 alertMsg("�Ƿ�ȡ��������",function(){
								 myNoAcepase()
				});
			 }
		