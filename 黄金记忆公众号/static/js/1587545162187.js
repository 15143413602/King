
				var users;
 				callBackUserInfo=function(user){
					users=user;
				}
				 function paySuccess(){
						if(isNaN(users.id)){
							alerts("��ѯ�С���");
							return;
						}
						
						var money = parseFloat( $("#money").val());
						if(isNaN(money)){
							alerts("������");
							return;
						}

						if(money<=0)return ;
							pay(money,function(){
							  	jsonPost( "/appCharge.do", {id:users.id,money:money}, function(data) {
									if (data.error == 0) {
											alerts("��ֵ�ɹ���");
									} else {
											alerts(data.error_msg);
									}
							  	});
						  });
					}
				