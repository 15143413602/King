
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
						if(data.islt!=2&&data.payfs==0){
							pushContent(MP.id, data.xuid,"�����ȴ���֧������",function(data){
								//location.href="huo-detail2.html?id="+MP.id;
							});
						}
					});
					 //��ֹ����
					 appBackFlag=false;
					 //����ʱ
			 }
			 var mypayCheck;
			 //�û�����״̬
			 var paystatus=false;
			 //��ȡ�����Ƿ񸶿�
			 function myNaiToAddr(flag){
				 jsonPost("/carRabTranOrder.do",{ status:orderInfo.status, id:MP.id,jdsj:new Date().getTime()},function(v){
						if(v.error==0){
							//��תҳ��
							 runMapNavi(orderInfo.cary,orderInfo.carx,orderInfo.fhry,orderInfo.fhrx);
							 location.href="map.html?id="+MP.id;
						}
				});

			 }
			 appBack=function(){
				 alertMsg("�Ƿ�ȡ��������",function(){
								 myNoAcepase()
				});
			 }
		