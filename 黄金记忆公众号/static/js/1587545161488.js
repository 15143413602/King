
		callBackInit=function(){
			$("#banner").html("");
			var column=4;
			var height=api.winHeight-130;
					$(".banner").css("height",height+"px");
					var userids=getStorage("userid");
					if(typeof MP.userid!="undefined")
					 userids=MP.userid;
				 getNewData("HomeController_2",{newApi:true,param:"{'p1':'"+userids+"'}"},function(data){

					  if(data.res!=0){
							alertMsg("您还没有家谱成员，立即去添加",function(){
								 openwin('../add.html');
							});
							return;
						}
					 	var width=(api.winWidth/column);
					  $.each(data.data,function(k,v){
							var ids="home"+v.bid;

							if($("#"+ids).length<=0){
								$("#banner").append('<div style="width:100%;overflow-y:hidden;overflow-x:scroll;"><div id="'+ids+'"  style="height:'+width
								+'px;overflow-y:hidden;text-align:center;    display: block;" class="myhomelist"></div></div>');
							}
							  $("#"+ids).append(replaceJsonKeys('<a href="../quan.html?userid={pid}&id={id}&qx={qx}" style="background:url('../image/txbg_03.png') no-repeat;background-size:100% ;width:'+(width-10)
								+'px;height:'+width
								+'px;margin:5px 5px;display:inline-block" class="home{bid} myhome"><img src="{pic}"><p>{name}</p></a>',v));

						});
						$(".myhomelist").each(function(){
						  var lens=$(this).find(".myhome").length;
							var minw=width*3;
							var noww=(api.winWidth/column*lens);
							if(noww<minw){
								noww=minw;
							}
							$(this).css("width",(noww)+"px");
						});
				 });

		}
		callBackUserInfo=function(user){

	 			jsonPost("/updateAboutMyUid.do",{mobile:user.username},function(){});

		}
		