
			 console.log(location.href);
				callBackInit=function(){
					//����״̬����
						 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
								   $(".pay").html('֧����<span>��'+data.jcfy+'</span>');
									 if(data.paystatus==2){
										 alerts("�����Ѿ���������ظ���");
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
	                alerts("֧���ɹ�");
									setTimeout(function(){
										winCloseFinish();
									},1500)
	              }
	          });

					 });
				}
				