
				var users;
				var money=0;
				callBackUserInfo=function(user){
					users=user;
					getSystem("USERLTBZJ",function(data){
						MLog(data);
						$(".baozheng").html('������ʱ��֤�𣬲��ܲ鿴��ͨ���ƻ�Դ��</br>��֤�𣺣�'+data.error_msg);
						money=parseFloat(data.error_msg)
					});
				}
					function paySuccess(){
						if(isNaN(users.id)){
							alerts("��ѯ�С���");
							return;
						}
						if(money<=0)return ;
							pay(money,function(){
							  	jsonPost( "/saveUser.do", {id:users.id,bzjmoney:money}, function(data) {
										if (data.error == 0) {
												alerts("�ɷѳɹ���");
										} else {
												alerts(data.error_msg);
										}
							  	});
						  });
					}
				