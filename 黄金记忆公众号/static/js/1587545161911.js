
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
						if(data.islt!=2&&data.payfs==0){
							pushContent(MP.id, data.xuid,"订单等待您支付费用",function(data){
								//location.href="huo-detail2.html?id="+MP.id;
							});
						}
					});
					 //禁止返回
					 appBackFlag=false;
					 //倒计时
			 }
			 var mypayCheck;
			 //用户付款状态
			 var paystatus=false;
			 //读取订单是否付款
			 function myNaiToAddr(flag){
				 jsonPost("/carRabTranOrder.do",{ status:orderInfo.status, id:MP.id,jdsj:new Date().getTime()},function(v){
						if(v.error==0){
							//跳转页面
							 runMapNavi(orderInfo.cary,orderInfo.carx,orderInfo.fhry,orderInfo.fhrx);
							 location.href="map.html?id="+MP.id;
						}
				});

			 }
			 appBack=function(){
				 alertMsg("是否取消订单？",function(){
								 myNoAcepase()
				});
			 }
		