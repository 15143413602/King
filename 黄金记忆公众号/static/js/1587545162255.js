
		var locHref="";
			//���� �ص�
			siliCallback=function(){
				console.log(locHref);
				 openwin(locHref);
			}

		 //��ӻ���
		 addSilide('ȥ����/�뼰ʱ����','��ȷ��',"f2");
		 addSilide('�ȴ�װ��/װ���������','��ȷ��',"f3");
		 addSilide('����׷��˾��λ��','��ȷ��',"f4");
		 addSilide('���������','��ȷ��',"f5");
		   //��������
			 function pushOrder(){
				   setTimeout(function(){
						// openwin("recharge.html");
					 },3000)
			 }
			 //�������Ͷ���
			 function rePushOrder(){
				 jsonPost("/pushUserTranOrder.do",{id:MP.id,lot:$(".O_fhry").val(),lot:$(".O_fhrx").val(),cartypeid:$(".O_cartypeid").val()},function(data){
					 alerts(data.error_msg);
					 if(data.error==0){
						 alerts("���ͳɹ���");
					 }
				 });
			 }
			//ȡ������
			function cancelOrder(){
				jsonPost("/cancelTranOrder.do",{id:MP.id},function(data){
					alerts(data.error_msg);
					if(data.error==0){
							winCloseFinish();
					}
				});
			}
			var payFlag=true;
			//���Ͳ���
			var firstPushFlag=true;
			//��ѯ�ӵ��� �Ƿ�ӵ�
			function myNaiToAddr(flag){
					getNewData("TranOrderController_1",{newApi:true,param:"{'p1':"+MP.id+"}"},function(data){
 							if(data.res==0){
								 var v = data.data[0];
								  if(v.status==0){
										$(".f1").show();
										$(".f2").hide();
										$(".f3").hide();
										$(".f4").hide();

										//���Ͷ���
										if(firstPushFlag)
											rePushOrder();
										firstPushFlag=false;
									}
									if(v.status>=1){
										//0 ��ͨ 1 ��ͨ 2 ����
										var islt=v.islt;
										var bzj=v.yjje;
										if(v.paystatus==1){
												$(".f1").hide();
												$(".f2").show();
												//$(".f2").click(function(){
														locHref=('pay1.html?id='+MP.id+"&type="+islt+"&money="+v.jcfy+"&bzj="+bzj);
											//	});
												payFlag=false;
										 }else  if(v.paystatus==2&&v.status==2){
											 $(".f1").hide();
											 $(".f2").hide();
											 $(".f3").show();
											 //$(".f3").click(function(){
													locHref=  ('xiadian-detail1.html?id='+MP.id+"&type="+islt+"&money="+v.jcfy+"&bzj="+bzj);
											// });
										 }else if(v.paystatus==2&&v.status>2){
											  $(".f1").hide();
										  	$(".f2").hide();
											  $(".f3").hide();
											  $(".f4").show();
											 //$(".f3").click(function(){
													 locHref=('infor.html?id='+users.id+"&type="+islt+"&money="+v.jcfy+"&bzj="+bzj);
											// });
										 }else  if(v.status>2)
										 {
											 $(".f1").hide();
												$(".f2").hide();
												$(".f3").hide();
												$(".f4").show();
										  //$(".f3").click(function(){
												 locHref=('infor.html?id='+users.id+"&type="+islt+"&money="+v.jcfy+"&bzj="+bzj);
										// });
									}else if(v.status>5){
										$(".f1").hide();
										 $(".f2").hide();
										 $(".f3").hide();
										 $(".f4").hide();
										  $(".f5").show();
											location.href="";
									}else {
										$(".f4").show();
									}
										//��ͼ��ע
										updateContent(marker2,v.cary,v.carx,"˾��λ��");

									}else{

									}
									checkOrderFlag=true;
							}

					},true);

			}
			 var users;
			 var mypayCheck;
			 //��ⶩ��
			 var checkOrderFlag=true;
			 callBackUserInfo=function(user){
				 users=user;
				 //����״̬����

				  getSingleData("TranOrderController_1",MP.id,"O_");
				  var map= showMaps_JS(0,0,0,0);
					var marker1=addMarker(map);
					 marker2=addMarker(map);
					 mypayCheck=setInterval(function(){
						if(checkOrderFlag){
							checkOrderFlag=false;
							myNaiToAddr(false);
							}
				 },4000);
					// ����֧��
			 }
			 var marker2;
		