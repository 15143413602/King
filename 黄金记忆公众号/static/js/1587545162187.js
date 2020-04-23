
				var users;
 				callBackUserInfo=function(user){
					users=user;
				}
				 function paySuccess(){
						if(isNaN(users.id)){
							alerts("查询中··");
							return;
						}
						
						var money = parseFloat( $("#money").val());
						if(isNaN(money)){
							alerts("金额错误！");
							return;
						}

						if(money<=0)return ;
							pay(money,function(){
							  	jsonPost( "/appCharge.do", {id:users.id,money:money}, function(data) {
									if (data.error == 0) {
											alerts("充值成功！");
									} else {
											alerts(data.error_msg);
									}
							  	});
						  });
					}
				