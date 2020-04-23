
		var aboutUrl="";
		function editUserAbout(){
			if(isNull(MP.show)){
			openwin(aboutUrl);
			}else{
				alerts("ÎÞÈ¨²Ù×÷");
			}
		}
		isLoadUserInfo=false;
		callBackInit=function(user){ 
			if(!isNull(MP.show))
			$(".aui-footer-fixed").hide();
			if(isNull(MP.userid)){ 
				
				getSqlData("TranOrderController_12","",[MP.uid],function(d){
					var data = d.data;
					 aboutUrl="fabu.html?uid="+MP.uid;
					$(".U_about").html(data.about);
					$(".U_name").html(data.name);
					$(".U_pic").attr("src",data.pic);
				});
			}else{ 
				getSqlData("HomeController_2_2","",[MP.userid],function(d){
				var data = d.data;
					aboutUrl="fabu.html?userid="+data.id;
					 
					$(".U_about").html(data.about);
					$(".U_name").html(data.name);
					$(".U_pic").attr("src",data.pic);
				});
				
			}

		}
		