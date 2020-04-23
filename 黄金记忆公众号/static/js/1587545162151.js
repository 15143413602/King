
		callBackUserInfo=function(user){
			 $(".xianjin").html(user.tcmoney+'元'+'，券：'+user.gmoney+'元（满额减）');
		};
		var allmoney=0;
		var orderData;
		callBackInit=function(){
			//启动状态监听
				 //$(".pay").html('支付运费：<span>￥'+MP.money+'</span>&nbsp;&nbsp;支付保证金：<span>￥'+MP.bzj+'</span>');

				 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
				  //合计费用计算
					orderData=data;
					 allmoney = parseFloat(sumAllMoney(data))+parseFloat(data.yjje);
				  $(".pay").html('<p>支付运费：'+data.jcfy+'元</p>'+
					'<p>搬运运费：'+data.bymoney+'元</p>'+
					'<p>装货超时：'+data.zccsmoney+'元</p>'+
					'<p>高速运费：'+data.gsmoney+'元</p>'+
						'<p>其他/停车费：'+data.qtmoney+'元</p>'+
						'<p>小费：'+data.xfmoney+'元</p>'+
					'<p>保证金额：'+data.yjje+'元，绿通专用</p><br/>合计费用：'+allmoney );
				});
	}
		function paySuccess(){
			if(allmoney<=0){
				alerts('请稍后····');
				return;
			}
			//支付方式
			var v=$("input[name='pay']");
			var val=0;
			v.each(function(){
				if($(this).is(":checked")){
				   val=($(this).val());
				}
			});
		  jsonPost("/appSumMoney.do",{money:allmoney},function(dts){
			  alerts(dts.error_msg);
			  if(dts.error==0){
				  layer.open({
					content: '支付金额：'+dts.money+"元，红包抵扣"+dts.give+" 元"
					,btn: ['立即支付', '取消']
					,skin: 'footer'
					,yes: function(index){
					  //开始支付
					   pay(parseFloat(dts.money),function(data){
						jsonPost("/carOrderPay.do",{status:orderData.status,jjje:dts.give,paystatus:2,id:MP.id,paytime:new Date().getTime(),paytype:val },function(data){
								  if(data.error==0){
									alerts("支付成功");
									setTimeout(function(){
										winCloseFinish();
									},1500)
								  }
							  });
						 });
					  layer.close(index);
					}
				  });

			  }
		  });

		}
				