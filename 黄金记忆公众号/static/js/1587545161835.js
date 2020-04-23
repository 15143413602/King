
		var aboutUrl="";
		function editUserAbout(){
			if(aboutUrl!="")
			   openwin(aboutUrl);
			else{
				alerts("ÄúÎÞÈ¨ÏÞ£¡");
			}
		}
		 
		isLoadUserInfo=false;
		callBackInit=function(user){ 
			if(isNull(MP.userid)){ 
				
				getSqlData("TranOrderController_12","",[MP.uid],function(d){
					var data = d.data;
					$(".U_about").html(data.about);
					$(".U_id").val(data.id);
					$(".tb_noform").val("boyun_users");
					aboutUrl="fabu.html?uid="+MP.uid;
					if(data.uid!=getStorage("userid")){
						aboutUrl="";
					}
				});
			}else{ 
				getSqlData("HomeController_2_2","",[MP.userid],function(d){
				var data = d.data;
					aboutUrl="fabu.html?userid="+data.id;
					$(".U_about").html(data.about);
					$(".U_id").val(data.id);
					$(".tb_noform").val("boyun_home");
					if(data.id!=getStorage("userid")){
						aboutUrl="";
					}
				});
				
			}

		}
		