
		function showFilerName(obj){
		
			$("h1").each(function(k,v){
				$(this).parent().parent().show();
				var text=""+$(this).text();
				if(text.indexOf(obj.value)!=-1){
					$(this).parent().parent().show();
				}else{
					$(this).parent().parent().hide();
				}
			});
		}
		function intoSpace(uid,qx,uname){
			if(qx>2){
				alerts("您无权限访问！");
				return;
			}
			openwin("./list.html?show=true&me=true&uid="+uid+"&qx="+qx+"&title="+encodeURI(uname+"的家人列表"));
		}
		function intoZhu(uid,qx){
			if(qx!=2){
				alerts("您无权限访问！");
				return;
			}
			openwin("../index_2.html?userid="+uid+"&qx="+qx+"&pname="+encodeURI(pname));
		}
		function intoCi(uid,qx){
			if(qx!=2){
				alerts("您无权限访问！");
				return;
			}
			openwin("../index_1.html?userid="+uid+"&qx="+qx);
		}
		callBackUserInfo=function(user){
			var temp=$(".temps").html();
			var userids=getStorage("userid"); 
			 getNewData("HomeController_2_6",{newApi:true,param:"{'p1':'"+user.username+"'}"},function(data){
				 if(data.res==0){
					 var length= data.data.length;
					  $.each(data.data,function(k,v){
								$(".aui-expert-list").append(replaceJsonKeys(temp, v));;
					  });
					}
			 });

		}
		