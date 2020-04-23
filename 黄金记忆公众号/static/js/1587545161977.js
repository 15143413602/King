
			//滑动 回调
			siliCallback=function(){
				reachLocation();
			}

			 //添加滑动
			 addSilide('确认收费','确认成功');
			 addFindString();
			 var allmoney=0;
			 var paystatus=0;
			 var string='<span>起止点限时:</span> {xs} ，超出: {xschs} ，未超出: {xswchs} <br/><span>卸载免费时间:</span> {xz} 超出: {xzchs} 未超出: {xzwchs}  <br/><span>起止点超时:</span>'+
			 ' {xsmoney}  元 <br/><span>卸货超时:</span> {xzmoney} 元'+
			 ' </br><span>运费:</span> {jcfy} 元 <br/><h2><span>总:</span> {allmoney} 元</h2>';

 			 callBackInit = function(){
				   getSingleData("TranOrderController_1",MP.id,"O_",function(data1){
								if(data1.islt==2){
									allmoney=data1.jcfy;
									paystatus=data1.paystatus;
										$(".infor").html('<span>用时:</span> '+secondToHour(parseInt(data1.xzxs))+'小时'+
						 			 ' </br><span>费用:</span> '+data1.jcfy+' 元 <br/><h2><span>总:</span> '+data1.jcfy+' 元</h2>');
								}else if(data1.islt==1){
									jsonPost("/moneyArithTranOrder.do",{orderId:MP.id},function(data){
											///	MLog(data);
			 						 			allmoney=data.allmoney;
			 						 			paystatus=data.paystatus;
												string='<span>起止点限时:</span> '+getTimes(data.xs)+'  ，超出: '+getTimes(data.xschs)+' ，未超出: '+getTimes(data.xswchs)+' <br/><span>卸载免费时间:</span> '+getTimes(data.xz)+
												' 超出:'+getTimes(data.xzchs)+' 未超出: '+getTimes(data.xzwchs)+'  <br/><span>起止点超时:</span>'+
								 			 ' '+data.xsmoney+'   元 <br/><span>卸货超时:</span> '+data.xzmoney+' 元'+'<p>支付运费：'+data.jcfy+'元</p>'+
											 '<p>搬运运费：'+data1.bymoney+'元</p>'+
											 '<p>装货超时：'+data1.zccsmoney+'元</p>'+
											 '<p>高速运费：'+data1.gsmoney+'元</p>'+
								 			 ' <h2><span>总:</span> '+data.allmoney+' 元</h2>';

												$(".infor").html(string);
			 					 });
							 }else{

								 //allmoney=data.jcfy;
								 paystatus=data.paystatus;
								 if(paystatus==0||paystatus==1){
									 pushContent(MP.id, data.xuid,"订单等待您支付费用",function(data){
										 //location.href="huo-detail2.html?id="+MP.id;
									 });
								 }
								 allmoney = parseFloat(sumAllMoney(data))+parseFloat(data.yjje);
							   $(".infor").html('<p>支付运费：'+data.jcfy+'元</p>'+
								 '<p>搬运运费：'+data.bymoney+'元</p>'+
								 '<p>装货超时：'+data.zccsmoney+'元</p>'+
								 '<p>高速运费：'+data.gsmoney+'元</p>'+
								 '<p>小费：'+data.xfmoney+'元</p>'+
								 '<p>停车/其他：'+data.qtmoney+'元</p>'+
								 ' <h2><span>总:</span> '+allmoney+' 元</h2>' );

							 }

					 });
			 }
			 function reachLocation(){
						location.href="huo-detail10.html?id="+MP.id+"&money="+allmoney+"&paystatus="+paystatus;
 			 }
			appBack=function(){
				//alertMsg("是否取消订单？",function(){
					//			myNoAcepase()
			  //});
			}
		