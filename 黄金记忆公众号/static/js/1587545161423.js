
		//滑动 回调
		siliCallback=function(){
			reachLocation();
		}
	//当前超时时间
	var longTime=0;
	 //添加滑动

			addFindString();
			addSilide('前往卸货地','成功确认');
			var statusMy=3;
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
						 //合计费用计算
						 //$(".heji").text('合计：'+sumAllMoney(data));
						 var jdsj=parseInt(data.zhstime)+payCarTime*60*1000;
						 mysetInte=setInterval(function(){
								 var now=new Date().getTime();
								 //超时计费规则
								 var val=parseInt(apps().XHMFZJSJG.value);
								 //分钟
								 var max=parseInt(apps().XHMFZJSJG.max);
								 if(now-jdsj>0){
									 countTime(jdsj,now,function(dt){
										 $(".jl").html("装车超时计时："+dt);
										});
								 }else{
									 countTime(now,jdsj,function(dt){
										 longTime=(now-jdsj)/1000/60;
											$(".jl").html("<p id='dataId' val='"+(now-jdsj)+"'>"+val+"元/"+max+"分钟</p>装车倒计时："+dt);
									 });

								 }

						 },1000);
					 });
					 appBackFlag=false;
			 }
			 function reachLocation(){
				//计算费用
				var money=0;
				//超时计费规则
				var val=parseInt(apps().XHMFZJSJG.value);
				//分钟
				var max=parseInt(apps().XHMFZJSJG.max);
				var tims = longTime/max;
				if(longTime%max>5){
					tims++;
				}
				money=val*tims;
				jsonPost("/carRabTranOrder.do",{zccsmoney:money,status:statusMy,id:MP.id,zhpic:$("#zhpic").val(),zhsj:new Date().getTime(),zhstime:new Date().gettime()},function(data){
 					if(data.error==0){
							if(statusMy==4){
								location.href="huo-detail7_1.html?id="+MP.id;
							}else{
								location.href="huo-detail5.html?id="+MP.id;
							  runMapNavi($("#fhry").val(),$("#fhrx").val(),$("#shry").val(),$("#shrx").val());
							}
					}
			  });
 			}
			appBack=function(){
				//alertMsg("是否取消订单？",function(){
					//			myNoAcepase()
			  //});
			}
		