
				//���� �ص�
				siliCallback=function(){
					reachLocation();
				}

			 //��ӻ���
			 addSilide('ȷ�����շ�/�����ӵ�','ȷ�ϳɹ�');
 		callBackInit = function(){

				$(".money").text(MP.money);
				var paystatus=MP.paystatus;
				if(paystatus==2){
					  	$(".paystatus").html('<span style="color:red">�û��Ѹ���</span>');
				}else {

						$(".paystatus").html('<span style="color:red">δ����</span>');
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

		