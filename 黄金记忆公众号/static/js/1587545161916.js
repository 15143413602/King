
				//滑动 回调
				siliCallback=function(){
					reachLocation();
				}

			 //添加滑动
			 addSilide('确认已收费/继续接单','确认成功');
 		callBackInit = function(){

				$(".money").text(MP.money);
				var paystatus=MP.paystatus;
				if(paystatus==2){
					  	$(".paystatus").html('<span style="color:red">用户已付款</span>');
				}else {

						$(".paystatus").html('<span style="color:red">未付款</span>');
				}
				var url = domainUrl+'/template/ekuaibang/pay.jsp?id='+MP.id+'&money='+MP.money;
				url = encodeURIComponent(url);
  				$(".adv").html('<li> <img src="'+domainUrl+'/qrAction?text='+url+'" style="width:70%;margin:0 auto;display:block;"/> </li> ');
			}
			function reachLocation(){
				 jsonPost("/checkTranOrder.do",{orderId:MP.id},function(data){

						//	if(data.error==0){

								  setTimeout(function(){winCloseFinish();},1000);
						//	}
 							//appBackFlag=false;
 				});
			}

		