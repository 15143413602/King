
				var users;
				var money=0;
				callBackUserInfo=function(user){
					users=user;
					getSystem("USERLTBZJ",function(data){
						MLog(data);
						$(".baozheng").html('不交限时保证金，不能查看绿通限制货源！</br>保证金：￥'+data.error_msg);
						money=parseFloat(data.error_msg)
					});
				}
					function paySuccess(){
						if(isNaN(users.id)){
							alerts("查询中··");
							return;
						}
						if(money<=0)return ;
							pay(money,function(){
							  	jsonPost( "/saveUser.do", {id:users.id,bzjmoney:money}, function(data) {
										if (data.error == 0) {
												alerts("缴费成功！");
										} else {
												alerts(data.error_msg);
										}
							  	});
						  });
					}
				