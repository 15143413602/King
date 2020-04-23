
		callBackUserInfo=function(user){
			 $(".xianjin").html(user.tcmoney+'元'+'，券：'+user.gmoney+'元（满额减）');
		};
		var allmoney=0;
		var orderData;
		callBackInit=function(){
			//启动状态监听
				 //$(".pay").html('支付运费：<span>￥'+MP.money+'</span>&nbsp;&nbsp;支付保证金：<span>￥'+MP.bzj+'</span>');

	}
		function paySuccess(){
			var val1= $("#shuidi").val();
			if(isNaN(val1)||val1==""||parseInt(val1)<=0){
				alerts("请输入正确的金额！");
				return ;
			}
			allmoney=parseFloat(val1);
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
		 pay(parseFloat(allmoney),function(data){
		 jsonPost("/carOrderPay.do",{ paytype:val },function(data){
					 if(data.error==0){
					 alerts("购买成功");
					 setTimeout(function(){
						 winCloseFinish();
					 },1500)
					 }
				 });
			});

		}
				