
			 console.log(location.href);
				callBackInit=function(){
					//启动状态监听
						 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
								   $(".pay").html('支付：<span>￥'+data.jcfy+'</span>');
									 if(data.paystatus==2){
										 alerts("订单已经付款！请勿重复！");
									 }
 										$(".save").click(function(){
											paySuccess(data.jcfy);
										});
						 });
				}

				function paySuccess(money){
					var money=parseFloat(money);
					 pay(money,function(data){
						 jsonPost("/carOrderPay.do",{ paystatus:2,id:MP.id,paytime:new Date().getTime(),jcfy:money,yjje:0},function(data){
	              if(data.error==0){
	                alerts("支付成功");
									setTimeout(function(){
										winCloseFinish();
									},1500)
	              }
	          });

					 });
				}
				