
		  function openQuanzi(url,title){
			openwin(url+"&title="+encodeURI(title));
		  }
		  callBackUserInfo=function(user){
			$(".mytitles").text(user.name+"的家人列表");
			if(!isNull(MP.show)){
				$(".xsycry").hide();
			}
		  }
          myTopColor="#FFFFFF";
		  function sheqing(bid,id,position,pid,obj){
			var text= $(obj).text()+"";
			if(text.indexOf("取消")!=-1){
				alertMsg("是否取消授权？",function(){
					  saveTables({"tb_noform":"boyun_home","qx":100,"id":id},function(data){
						alerts("设置成功！"); 
						reload();
					 },false);
				});
			}else{
				if(pid=="0"){
					alerts("无法申请，对方未注册！");
					return;
				}
				alertMsg("申请查看他/她家的权限？",function(){
					 sendRegMsg("("+pid+")"," 【"+userInfo.name+"】向你提出申请，希望去你家参观！");
				});
			 }
		  }
		  function upTrees(bid,id,position){
		  
		   getNewData("HomeController_1",{newApi:true},function(data){
				  var isupflag=false;
				  $.each(data.data,function(k,v){
						var ids=homeValue+v.id;
					 	 
						for(var i=0;i<v.counts;i++){
							 var home= ids+"_"+i;
							if( $("."+home).length==0){
							isupflag=true;
								updateTable("HomeController_18",{sql:"",param:"{'p1':'1','p2':'"+i+"','p3':'"+v.id+"','p4':'"+id+"'}"}
									,	function(data){  
										layer.closeAll();alerts("设置成功");
										
								});
							}
						}
						  
				  });  
				  if(!isupflag)alerts("对不起，树上没有空位。");
			});  
			
		  }
        