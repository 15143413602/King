

			callBackUserInfo=function(user){
				$(".ewm").find("img").attr("src",domainUrl+"/qrAction?text="+shareDomainurl+"/car_wap/html/reg.html?id="+user.id);
			$(".save").click(function(){
				jsonPost('/recommendUser.do',{tj:$('#name').val()},function(data){alerts(data.error_msg);});
			});

 		 }
		