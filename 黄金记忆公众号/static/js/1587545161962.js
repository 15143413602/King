
			 //滑动 回调
			 siliCallback=function(){
				 reachLocation();
			 }

		  	//添加滑动

       addFindString();
			 function reachLocation(){
				  clearInterval(mysetInte);
					if(orderInfo.payfs==1){
								location.href="huo-detail5_1.html?id="+MP.id;
					}else{
						jsonPost("/carRabTranOrder.do",{status:5,id:MP.id ,xzwsj:new Date().getTime()},function(data){
							if(data.error==0){
									location.href="huo-detail9.html?id="+MP.id;
							}
					  });
					}


 			}
       var mysetInte;
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
						 if(data.islt==2){
					 	   addSilide('施工完成/收费','确认成功');
					  }
					  else{
					 	   addSilide('卸车完成/收费','确认成功');
					  }
						var jdsj=parseInt(data.ddsj)+parseInt(apps().XZSJXSC.value)*60*1000;
						//&&data.payfs==1
						if(data.islt!=2){
						mysetInte=setInterval(function(){
								var now=new Date().getTime();
								if(now-jdsj>0){
									countTime(jdsj,now,function(dt){
										$(".jl").html("卸车超时计时："+dt);
										if(dt==""){
												 // clearInterval(mysetInte);
										 }
									 });
								}else{
									countTime(now,jdsj,function(dt){
										 $(".jl").html("卸车倒计时："+dt);

										 if(dt==""){
													// clearInterval(mysetInte);
										 }
									});

								}

						},1000);
					}else{
						$(".ksxhl").hide();
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

			 appBack=function(){
			 }
		