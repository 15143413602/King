
		//滑动 回调
		siliCallback=function(){
			reachLocation();
		}
		//当前超时时间
		var longTime=0;
	 //添加滑动

			addFindString();
			var statusMy=3;
			var orderData;
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
						orderData=data;
						 if(data.islt==2){
							 $(".am-header-title").text("到达施工地拍照");
							 $(".pass").text('对施工地进行拍照！');
							   addSilide('开始施工','成功确认');
								 statusMy=4;
						 }else{
							 $(".zcdjs").show();
							 //合计费用计算&&data.payfs==1
				     if(data.islt!=2){
							 //$(".heji").text('合计：'+sumAllMoney(data));
							 var jdsj=parseInt(data.zhsj)+parseInt(apps().CARZCDDSJ.value)*60*1000;
							 mysetInte=setInterval(function(){
									 var now=new Date().getTime();
									 //超时计费规则
									 var val=parseInt(apps().XHMFZJSJG.value);
									 //分钟
									 var max=parseInt(apps().XHMFZJSJG.max);
									 if(now-jdsj>0){
										 countTime(jdsj,now,function(dt){
											 longTime=(now-jdsj)/1000/60;
											 var tims =parseInt( longTime/max);
											 if(longTime%max>5){
												 tims++;
											 }
											 var money=val*tims;
											 $(".zcdjs").html("<p id='dataId' style='font-size:14px;color:red' val='"+(now-jdsj)+"'>超时费用："+money+"元</p>装车已超时："+dt);
											});
									 }else{
										 countTime(now,jdsj,function(dt){

												$(".zcdjs").html("<p id='dataId' style='font-size:14px;color:red' val='"+(now-jdsj)+"'>超时计费："+val+"元/"+max+"分钟</p>装车倒计时："+dt);
										 });

									 }

							 },1000);
						 }else{
							 $(".zcdjs").hide();
						 }
							   addSilide('前往卸货地/计算费用','成功确认');
						 }
					 });
					 appBackFlag=false;
			 }
			 function reachLocation(){
				if($("#zhpic").val()==""){
					alerts("请拍照");
					return;
				}
				//计算费用
				var money=0;
				//超时计费规则
				var val=parseInt(apps().XHMFZJSJG.value);
				//分钟
				var max=parseInt(apps().XHMFZJSJG.max);
				 var tims =parseInt( longTime/max);
				if(longTime%max>5){
					tims++;
				}
				money=val*tims;
				var paystatus=1;
				if(orderData.paystatus==2)
					paystatus=2;
				jsonPost("/carRabTranOrder.do",{paystatus:paystatus,zhstime:new Date().getTime(),zccsmoney:money,status:statusMy,id:MP.id,zhpic:$("#zhpic").val(),zhsj:new Date().getTime()},function(data){
 					if(data.error==0){
							if(statusMy==4){
								location.href="huo-detail7_1.html?id="+MP.id;
							}else{
								if(orderInfo.payfs==1)
								{
									location.href="huo-detail5.html?id="+MP.id;
								}
								else {
									location.href="huo-detail5_1.html?id="+MP.id;
								}
							  //runMapNavi($("#fhry").val(),$("#fhrx").val(),$("#shry").val(),$("#shrx").val());
							}
					}
			  });
 			}
			appBack=function(){
				//alertMsg("是否取消订单？",function(){
					//			myNoAcepase()
			  //});
			}
		