
		callTouchEndBack=function(){
		 //$("#treeMenu").hide();
		}
		//���������¼�
		callTouchBack=function(data,left,top){
		
			//����������Ա������ searchHomeMember();

			if(typeof(data.attr("data-id"))!="undefined"){
 				 if( $("#treeMenu").is(":hidden")){
					 $("#treeMenu").show();
				 }else{
					 $("#treeMenu").hide();
				 }
				 $("#treeMenu").css({"left":(left-divComWidth/2)+"px","top":(top+divComHeight/2)+"px"});
				 var id=data.attr("data-id");
				 //ɾ��
				 $(".deleteHome").unbind();
				 $(".deleteHome").click(function(){
					alertMsg("��ȷ��Ҫɾ���ó�Ա��",function(){
						delUidContent(null,id,"boyun_home");
					});  
				 });
				 //����
				 $(".downHome").unbind();
				 $(".downHome").click(function(){
					alertMsg("��ȷ��Ҫ������",function(){
						updateTable("HomeController_17",{sql:"",param:"{'p1':'0','p2':'0','p3':'"+id+"'}"}
						,	function(data){  layer.closeAll(); alerts("���óɹ�"); reload();});
					});  
				 });
				 //����
				 $(".hiddenHome").unbind();
				 $(".hiddenHome").click(function(){
					//showAlertInput(""); 
					hideController(id);
				 });
				 //����ռ�
				 $(".openSpaces").unbind();
				 $(".openSpaces").click(function(){
					//showAlertInput(""); 
					openwin('../quan.html?title='+encodeURI(data.attr("data-name"))+'&nuid='+data.attr("data-uid")+'&uid='+id+"&pid="+data.attr("data-pid"));
				 });
				 
			}
		}
		/* addMenus([
			   {"title":"����","url":"javascript:upTreeMember();"},
			   {"title":"���б�","url":"list.html?type=1"},
			   {"title":"ֱ������","url":"javascript:searchHomeMember();"},
			   {"title":"������ϵ","url":"javascript:nowLinkMember();"},
			    {"title":"�ݲ���ϵ","url":"javascript:noLinkMember();"}
			   ],"homemenu");*/
		function nowLinkMember(){
			searchHomeMember(function(data){
				if(data.pid==0){
					alerts("�����Ա��δע�ᣡ");
				}else
				sendRegMsg("("+data.pid+")","���ļ����Ա����������ϵ�Ƿ�ͬ�⣿");
			});
		}
		function noLinkMember(){
			searchHomeMember(function(data){
				updateSql("HomeController_23","",[data.id],function(data){
					alerts("���óɹ���");
				});
			});
		}
		function upTreeMember(){
			searchHomeMember(function(data){
				if(data.status==1){
					alerts("�����Ա�Ѿ������أ�");
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
			//��ӱ�����Ϣ
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
							+'px;margin:5px 5px;display:inline-block" class="22'+ids+"_"+i+' myhome"><img onclick="openwin(\'../add.html?bid='+v.id+'&position='+i+'\')"  src="'+user.pic+'"><p style="color:red">��</p></a>',v));
							}else{
							$("#"+ids).append(replaceJsonKeys('<a href="javascript:;" href1="../quan.html?userid={pid}&id={id}&qx={qx}" style="background:url(../image/txbg_03.png) no-repeat;background-size:100% ;width:'+(width-10)
							+'px;height:'+width
							+'px;margin:5px 5px;display:inline-block" class="'+ids+"_"+i+' myhome"><img onclick="openwin(\'../add.html?bid='+v.id+'&position='+i+'\')" data-class="'+ids+'_'+i+'" data-position="'+i+'" data-bid="'+v.id+'" src="../image/adds.png"><p>���</p></a>',v));
							}
						}
						  
				  });  
				 //��ӳ�Ա
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
						alertMsg("����û�м��׳�Ա������ȥ���",function(){
							 openwin('../add.html');
						});
						return;
					}
					 //��ʷid
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
					 //��ӳ����¼�
					//addTouchMouse($("#banner").find("img"));
					moveDivs($("#banner").find("img"));
					
			 });

			  });
			

		} 
		//�ϻص�
		divComWidth=60;
		dragCallBack=function(now,old){
			var id=old.attr("data-id");
					//��ǰλ��û��
			//��ȡ��ǰλ������
			var bid=old.attr("data-bid");
			var position=old.attr("data-position");
			var tid=now.attr("data-id");
 			if(id!=tid&&  typeof bid!="undefined" ){
			if(typeof id=="undefined"){
			     alertMsg("ȷ���ƶ�λ�ã�",function(){
					updateTable("HomeController_18",{sql:"",param:"{'p1':'1','p2':'"+position+"','p3':'"+bid+"','p4':'"+tid+"'}"}
						,	function(data){   layer.closeAll(); alerts("���óɹ�"); reload(); 
					   });
				 });  
			}else{
				alertMsg("ȷ���ƶ����滻λ�ã�",function(){
					updateTable("HomeController_18",{sql:"",param:"{'p1':'1','p2':'"+position+"','p3':'"+bid+"','p4':'"+tid+"'}"}
						,	function(data){  
							updateTable("HomeController_17",{sql:"",param:"{'p1':'0','p2':'0','p3':'"+id+"'}"}
						,	function(data){  layer.closeAll(); alerts("���óɹ�"); reload();});
					   });
				 }); 
			}
			moveDivs($("#banner").find("img"));
			}
		}
		