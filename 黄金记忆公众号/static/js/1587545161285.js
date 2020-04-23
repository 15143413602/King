

	 	var flagTrue=true;
		function drawMoney(){
							 var m= parseFloat($(".U_tcmoney").val());
							 var tc=parseFloat($("#money").val());
							 if($("#money").val()==""||tc>m){
								 alerts("请输入正确的提现金额！");
								 return;
							 }
							 if(tc==0){
								 alerts("提现金额错误！" );
								 return;
							 }
						// /template/disshop/action/cashAction.jsp

							 if(flagTrue){
								 flagTrue=false;
								 jsonPost("/drawMoneys.do", {m:$("#money").val(),user:"null"
								 }, function(data) {
									  	if(data.error==0){
											 alerts( data.error_msg);

											 //loadSuccess();
											 setTimeout(function(){location.href='/wap/lecai/135.jsp?select=user';},1500)
										 }else{
										 	alerts( data.error_msg);
										 }
										 flagTrue=true;
									 });
									}
				}
			 