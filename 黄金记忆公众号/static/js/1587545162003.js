
		callTouchEndBack=function(){
		 //$("#treeMenu").hide();
		}
		//长按返回事件
		callTouchBack=function(data,left,top){
		
			//输入隐藏人员姓名： searchHomeMember();

			if(typeof(data.attr("data-id"))!="undefined"){
 				 if( $("#treeMenu").is(":hidden")){
					 $("#treeMenu").show();
				 }else{
					 $("#treeMenu").hide();
				 }
				 $("#treeMenu").css({"left":(left-divComWidth/2)+"px","top":(top+divComHeight/2)+"px"});
				 var id=data.attr("data-id");
				 //删除
				 $(".deleteHome").unbind();
				 $(".deleteHome").click(function(){
					alertMsg("您确定要删除该成员吗？",function(){
						delUidContent(null,id,"boyun_home");
					});  
				 });
				 //下属
				 $(".downHome").unbind();
				 $(".downHome").click(function(){
					alertMsg("您确定要下树吗？",function(){
						updateTable("HomeController_17",{sql:"",param:"{'p1':'0','p2':'0','p3':'"+id+"'}"}
						,	function(data){  layer.closeAll(); alerts("设置成功"); reload();});
					});  
				 });
				 //隐藏
				 $(".hiddenHome").unbind();
				 $(".hiddenHome").click(function(){
					//showAlertInput(""); 
					hideController(id);
				 });
				 //进入空间
				 $(".openSpaces").unbind();
				 $(".openSpaces").click(function(){
					//showAlertInput(""); 
					openwin('../quan.html?title='+encodeURI(data.attr("data-name"))+'&nuid='+data.attr("data-uid")+'&uid='+id+"&pid="+data.attr("data-pid"));
				 });
				 
			}
		}
		/* addMenus([
			   {"title":"上树","url":"javascript:upTreeMember();"},
			   {"title":"进列表","url":"list.html?type=1"},
			   {"title":"直接隐藏","url":"javascript:searchHomeMember();"},
			   {"title":"马上联系","url":"javascript:nowLinkMember();"},
			    {"title":"暂不联系","url":"javascript:noLinkMember();"}
			   ],"homemenu");*/
		function nowLinkMember(){
			searchHomeMember(function(data){
				if(data.pid==0){
					alerts("家族成员还未注册！");
				}else
				sendRegMsg("("+data.pid+")","您的家族成员请求与您联系是否同意？");
			});
		}
		function noLinkMember(){
			searchHomeMember(function(data){
				updateSql("HomeController_23","",[data.id],function(data){
					alerts("设置成功！");
				});
			});
		}
		function upTreeMember(){
			searchHomeMember(function(data){
				if(data.status==1){
					alerts("家族成员已经被隐藏！");
				}else{
				  isUpTree(data.bid,data.id,0); 
				}
			});
		}
		callBackUserInfo=function(user){
		  
		//
		 jsonPost("/updateAboutMyUid.do",{mobile:user.username},function(){}); 
			var column=4;
			var height=0;
			var width=0;
			if(isAppType==1){
				width=($(window).width()/column);
			} else{
				width=(api.winWidth/column);
			}
			 divComWidth=width,divComHeight=width;
			 var centerPerson=0;
			//添加辈分信息
			 getNewData("HomeController_1",{newApi:true},function(data){
				  $.each(data.data,function(k,v){
						var ids=homeValue+v.id;
					 	if($("#"+ids).length<=0){
							$("#banner").append('<div style="width:100%;overflow-y:hidden;overflow-x:scroll;"><div id="'+ids+'"  style="height:'+width
							+'px;overflow-y:hidden;text-align:center;    display: block;" class="myhomelist"></div></div>');
						}
						for(var i=0;i<v.counts;i++){
							centerPerson++;
							if(centerPerson==5){
							$("#"+ids).append(replaceJsonKeys('<a href="../quan.html" href1="../quan.html?userid={pid}&id={id}&qx={qx}" style="background:url(../image/txbg_03.png) no-repeat;background-size:100% ;width:'+(width-10)
							+'px;height:'+width
							+'px;margin:5px 5px;display:inline-block" class="22'+ids+"_"+i+' myhome"><img onclick="openwin(\'../add.html?bid='+v.id+'&position='+i+'\')"  src="'+user.pic+'"><p style="color:red">我</p></a>',v));
							}else{
							$("#"+ids).append(replaceJsonKeys('<a href="javascript:;" href1="../quan.html?userid={pid}&id={id}&qx={qx}" style="background:url(../image/txbg_03.png) no-repeat;background-size:100% ;width:'+(width-10)
							+'px;height:'+width
							+'px;margin:5px 5px;display:inline-block" class="'+ids+"_"+i+' myhome"><img onclick="openwin(\'../add.html?bid='+v.id+'&position='+i+'\')" data-class="'+ids+'_'+i+'" data-position="'+i+'" data-bid="'+v.id+'" src="../image/adds.png"><p>添加</p></a>',v));
							}
						}
						  
				  });  
				 //添加成员
				 //$("#banner").html("");
			
			if(isAppType==1){
				height=$(window).height();
				if(height>660)
				height=height-70;
			} else{
				height=api.winHeight
				if(height>700)
					height=height-130;
			}
			if(height<588){
				height=588;
				$(".dianji").css("bottom","-100px");
			}
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
					 //历史id
					  var oldId="";
					  var curNumb=0;
					   $.each(data.data,function(k,v){
							if(v.isadd==1){
								 var ids=homeValue+v.bid;

								 if(ids!=oldId){
									 oldId=ids;
									 curNumb=0;
								 } 
								$("."+ids+"_"+v.position).html(replaceJsonKeys(' <img src="{pic}" data-class="'+ids+'_'+v.position+'" data-position="'+v.position+'" data-bid="{bid}" data-uid="{uid}" data-pid="{pid}" id="pic_{id}" data-id="{id}" data-position="{position}" data-name="{name}"><p>{name}</p> ',v));
							}

						}); 
					 //添加长按事件
					//addTouchMouse($("#banner").find("img"));
					moveDivs($("#banner").find("img"));
					
			 });

			  });
			

		} 
		//拖回调
		divComWidth=60;
		dragCallBack=function(now,old){
			var id=old.attr("data-id");
					//当前位置没人
			//获取当前位置坐标
			var bid=old.attr("data-bid");
			var position=old.attr("data-position");
			var tid=now.attr("data-id");
 			if(id!=tid&&  typeof bid!="undefined" ){
			if(typeof id=="undefined"){
			     alertMsg("确定移动位置？",function(){
					updateTable("HomeController_18",{sql:"",param:"{'p1':'1','p2':'"+position+"','p3':'"+bid+"','p4':'"+tid+"'}"}
						,	function(data){   layer.closeAll(); alerts("设置成功"); reload(); 
					   });
				 });  
			}else{
				alertMsg("确定移动并替换位置？",function(){
					updateTable("HomeController_18",{sql:"",param:"{'p1':'1','p2':'"+position+"','p3':'"+bid+"','p4':'"+tid+"'}"}
						,	function(data){  
							updateTable("HomeController_17",{sql:"",param:"{'p1':'0','p2':'0','p3':'"+id+"'}"}
						,	function(data){  layer.closeAll(); alerts("设置成功"); reload();});
					   });
				 }); 
			}
			moveDivs($("#banner").find("img"));
			}
		}
		