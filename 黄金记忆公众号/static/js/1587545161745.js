
		var locHref="";
			//滑动 回调
			siliCallback=function(){
				console.log(locHref);
				 openwin(locHref);
			}

		 //添加滑动
		 addSilide('去付款/请及时付款','已确认',"f2");
		 addSilide('等待装货/装货完成拍照','已确认',"f3");
		 addSilide('正在追踪司机位置','已确认',"f4");
		 addSilide('订单已完成','已确认',"f5");
		   //订单推送
			 function pushOrder(){
				   setTimeout(function(){
						// openwin("recharge.html");
					 },3000)
			 }
			 //重新推送订单
			 function rePushOrder(){
				 jsonPost("/pushUserTranOrder.do",{id:MP.id,lot:$(".O_fhry").val(),lot:$(".O_fhrx").val(),cartypeid:$(".O_cartypeid").val()},function(data){
					 alerts(data.error_msg);
					 if(data.error==0){
						 alerts("推送成功！");
					 }
				 });
			 }
			//取消订单
			function cancelOrder(){
				jsonPost("/cancelTranOrder.do",{id:MP.id},function(data){
					alerts(data.error_msg);
					if(data.error==0){
							winCloseFinish();
					}
				});
			}
			var payFlag=true;
			//推送测试
			var firstPushFlag=true;
			//查询接单人 是否接单
			function myNaiToAddr(flag){
					getNewData("TranOrderController_1",{newApi:true,param:"{'p1':"+MP.id+"}"},function(data){
 							if(data.res==0){
								 var v = data.data[0];
								  if(v.status==0){
										$(".f1").show();
										$(".f2").hide();
										$(".f3").hide();
										$(".f4").hide();

										//推送订单
										if(firstPushFlag)
											rePushOrder();
										firstPushFlag=false;
									}
									if(v.status>=1){
										//0 普通 1 绿通 2 工程
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
										//地图标注
										updateContent(marker2,v.cary,v.carx,"司机位置");

									}else{

									}
									checkOrderFlag=true;
							}

					},true);

			}
			 var users;
			 var mypayCheck;
			 //检测订单
			 var checkOrderFlag=true;
			 callBackUserInfo=function(user){
				 users=user;
				 //启动状态监听

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
					// 测试支付
			 }
			 var marker2;
		