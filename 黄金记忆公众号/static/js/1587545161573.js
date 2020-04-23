
				//滑动 回调
				siliCallback=function(){
					reachLocation();
				}

			 //添加滑动

						function reachLocation(){
							var myUrl = (location.href+"").replace(/#/ig,"");
							var nowId = myUrl .split("=")[1];
							 jsonPost("/carRabTranOrder.do",{status:2,id:MP.id,zhsj:new Date().getTime()},function(data){
								 if(data.error==0){
										 closeAmap();
										  location.href="huo-detail4.html?id="+nowId;

										/* if(v.payfs==0){
											   location.href="huo-detail4.html?id="+nowId;
										 }else {
										 	   location.href="huo-detail4_1.html?id="+nowId;
										 }*/
								 }
							});
						}
						//地图
						var mapNew;
					  callBackInit=function(){
							//禁止返回
							appBackFlag=false; 
							getSingleData("TranOrderController_1",MP.id,"O_",function(v){
 	 								//showMap(v.cary,v.carx,v.fhry,v.fhrx,160);
									mapNew = sumPoint(v.cary,v.carx,v.fhry,v.fhrx,function(){});
									$(".jixdahang").click(function(){
 											 runMapNavi(v.cary,v.carx,v.fhry,v.fhrx);
									});
									if(v.islt==2){
										addSilide('施工地点/拍照','成功确认');
									}else{
										addSilide('到达发货地/开始装货拍照','成功确认');
									}
							});

						}
						appBack=function(){
							alertMsg("是否取消订单？",function(){
											myNoAcepase()
						 });
						}
				