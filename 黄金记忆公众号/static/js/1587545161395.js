
				//滑动 回调
				siliCallback=function(){
					myNaiToAddr(true);
				}

			 //添加滑动
			 addSilide('前往发货地','开始导航');
			 addFindString();
			 var mysetInte;
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
						//合计费用计算
						$(".heji").text('合计：'+sumAllMoney(data));
						if(data.islt!=2){
							pushContent(MP.id, orderInfo.xuid,"订单等待您支付费用",function(data){
								//location.href="huo-detail2.html?id="+MP.id;
							});
							$(".jl").show();
						 	   var jdsj=parseInt(data.jdsj)+payCarTime*60*1000;
									mysetInte=setInterval(function(){
											var now=new Date().getTime();
										countTime(now,jdsj,function(dt){
												 $(".jl").html("付费倒计时："+dt);

												 if(dt==""){
													     clearInterval(mysetInte);
			 											  	myNoAcepase();
												 }
										});
									},1000);
									//启动状态监听
									mypayCheck=setInterval(function(){
										   myNaiToAddr(false);
									},4000);
									if(data.payfs==1&&data.islt!=2){
											clearInterval(mysetInte);
										//	$(".jl").val("用户已经付款！");
											clearInterval(mypayCheck);
											location.href="map.html?id="+MP.id;
											//开始导航
											runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
									}else{

									}
						}
					});
					 //禁止返回
					 //appBackFlag=false;
					 //倒计时
			 }
			 var mypayCheck;
			 //用户付款状态
			 var paystatus=false;
			 //读取订单是否付款
			 function myNaiToAddr(flag){

					 getNewData("TranOrderController_1",{newApi:true,param:"{'p1':"+MP.id+"}"},function(data){
							 if(data.res==0){

								  var v = data.data[0];
									if(v.islt!=2&&v.payfs==0){
						    if(v.payfs==1){
											clearInterval(mysetInte);
										//	$(".jl").val("用户已经付款！");
											clearInterval(mypayCheck);
											location.href="map.html?id="+MP.id;
											//开始导航
											runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
									} else if(v.paystatus==2){

										 clearInterval(mysetInte);
										 $(".jl").val("用户已经付款！");
										 clearInterval(mypayCheck);
										 runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
										 jsonPost("/carRabTranOrder.do",{ status:v.status, id:MP.id,jdsj:new Date().getTime()},function(data){
						  					if(data.error==0){
													//跳转页面
 												     location.href="map.html?id="+MP.id;
						 				  	}
						 			  });
										 //开始导航
										 //runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
									 }else{
										 if(flag){
											 alertMsg("货主未付运费！系统不做赔偿担保，是否确认？",function(){
 												clearInterval(mysetInte);
											//	$(".jl").val("用户已经付款！");
												clearInterval(mypayCheck);
												location.href="map.html?id="+MP.id;
												//开始导航
												runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
											});
									}
								}
							}else{
										location.href="map.html?id="+MP.id;
										//开始导航
										runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
									}
							 }
					 },true);

			 }
			 appBack=function(){
				 alertMsg("是否取消订单？",function(){
								 myNoAcepase()
				});
			 }
		