
       if(isAppType==1){
		
			addBlankSpace();
			addplugsUpload("chose_pic_btn","aui-upload-pic","ossfile","postfiles","image/*","",1,true);
			//增加点滴事件 替换onclick
			$("#touxiang").attr("onclick",$("#chose_pic_btn1").attr("onclick"));
		}
		uploadCallback=function(pic){
		 if(typeof MP.uid!="undefined"){
			saveUsers({pic:pic,tb_noform:"boyun_home",id:MP.uid},function(){
              getUserInfos();
            });
		 }else  if(typeof MP.userid!="undefined"){
		//	saveUsers({pic:pic,tb_noform:"boyun_home",id:MP.uid},function(){
          //    getUserInfos();
        //   });
		 }else{
		   saveUsers({pic:pic},function(){
              getUserInfos();
           });
		 } 
       }
		//不加载系统用户信息
		isLoadUserInfo=false;
  //	分享给好友
		var shareSpaceId=0;
		function shareMyFriend(){
			openwin('./html/list_1.html?show=true&id='+shareSpaceId);
		}
		function shareMySpace(){
			alertMsg('权限级别：'+sendQuanx,function(){
		        jsonPost("/sharesSpace.do",{shareid:shareSpaceId,qx:$("#qx").find("option:selected").val()},function(data){
					alerts("分享成功！");
					addClickCount(shareSpaceId,'boyun_home_quan','zcount','quan','.zcount'+shareSpaceId);
					reload();
				});
		   },"分享权限");  
		}
		function showShare (id){
			shareSpaceId=id;
			commenDiv("#actionSheet");
			
		}
		$("#cancel").click(function(){
			$('.commentDiv').remove();
			$("#actionSheet").hide();
		});
		function showdetail(obj){
			var whilt=$(obj).css("white-space");
			if(whilt=="normal"){
				$(obj).css("white-space","nowrap")
			}else{
				$(obj).css("white-space","normal")
			}
		}
       
		function onshowClick(obj,pass){
			callPassWord("输入解锁密码",function(data){
				if(data.pwd==pass){
					$(obj).hide();
					isPwdInput.close();
				}else{
					if((data.pwd+"").length==6){
						alerts("密码错误");
					}
				}
			});
		}
		isAppendCssFlag=false;
		function hideUser(){
			//hideOrShow(MP.id,1);
			hideController(MP.id);
		}
		//下载礼物文件
	  callBackInit = function(){
			//隐藏空间按钮
			if(typeof MP.id =="undefined"){
				$(".myeye").hide();
			}
			 if(typeof MP.userid!="undefined"){
				$("#touxiang").attr("onclick","");
			 }
            addHrefOpenAttr();
		    orderType=true;
 		 //下载礼物
		 getNewData("HomeController_3",{newApi:true},function(data){
			if(data.res==0){ 
				  var countNum=0;
				 $.each(data.data,function(k,v){
							//遍历礼物
						//下载礼物
						if(isAppType==0)
							savePicture(domainUrl+v.pic);
						var json = {};
						var url =v.pic+"";
						var name =url.substring(url.lastIndexOf("/")+1);
						json.pic=url;
						json.normal='fs://'+name;
						json.highlight='fs://'+name;
						json.giftName=v.title;    //字符串类型；按钮下边的礼物名称
						json.price=v.prize;          //字符串类型；礼物价格标签文本
						json.title=v.title;
						json.prize=v.prize;
						showGiftList+='<a onclick="clickGifShow('+countNum+')" href="javascript:;" '+
						' data="'+countNum+'" '+
						' class="gifts"><img src="'+url+'"><p>'+v.title+'<span style="color:red;font-size:11px;">[￥'+v.prize+']</span></p></a>';
						 
						gifts.push(json);
						countNum++;
				 });
				} 
		 });

		 }
		 //禁止返回
		 appBack=function(){
		 } 
		 var load_swiper_flag=true;
		 t.scroll_callback_forward_getdata=true;
		 t.scroll_callback_function=function(){
		   
		 page_num_now++;
		 console.log(page_num_now);
		 changeSelete(  );
		  
	 }
	   t.maxnum=10;
		 //加载数据
		 var nowVaueSelectId=0;
		 function changeSelete(){
			 var sqls="";
			 var style="display:none;"
				

				var uid=MP.userid;
				if(typeof uid=="undefined"||uid==""||uid=="null"){
					uid=getStorage("userid");
					style="display:block;"
				}else{
					sqls=sqls+ " and qx="+MP.qx;

				}
				if(MP.type=="public"){
					$(".aui-center-title").html( "公共空间");
					sqls=" ispublic=1";
				}else if(typeof MP.uid!="undefined"){
					sqls="userid="+MP.uid;
					
				}else{
					sqls=" userid=0 and uid="+uid+ sqls;
				}
				if(nowVaueSelectId==2){
					sqls ="and "+sqls+" and isvideo=1"
				}else{
					if(nowVaueSelectId==1)
					 sqls="and "+sqls+" and stype="+nowVaueSelectId;
				}
 				var temps=$("#temps").html();
						//remenfriend myFriends
						jsonPost("/sqlAction?sqlname=HomeController_4",{newApi:true,sql:sqls,
							"param":"{ 'p1':"+((page_num_now-1)*t.maxnum)+",'p2':"+t.maxnum+"}"},function(data){
								//  她她她MLog(data);
 							
							if(data.res==0){
								 
								$.each(data.data,function(k,v){
									if(getStorage("userid")!=v.uid){
										style="display:none;"
									}else{
										style="";
									} 
									$(".tab-panel-item"+nowVaueSelectId).append(replaceJsonKeys(temps,v).replace(/\{style\}/ig,style) );
								}); 
							} 
							addHrefOpenAttr(); 
							if(MP.type=="public") 
								$(".mmdd").remove(); 
				 });
		 }
		 //自定义回调解析函数
		 function jsonDefineCall(string,v){
			 //是现实提示密码输入
				 if(v.pass==""){
			 			return string.replace(/\{passhide\}/ig,"display:none;");
			   }else{
					  if(parseInt(v.passtime)<(new Date().getTime())){
							return string.replace(/\{passhide\}/ig,"display:none;");
						}else{
							return string.replace(/\{passhide\}/ig,"display:block;");
						}

				 }
		 }
		 function changeLoadList(val){
			 		page_num_now=1;
					nowVaueSelectId=val;
					Mflag=true;
				  $(".tab-panel-item").html("");
					changeSelete();
		 }
		 
		 callBackUserInfo=  function(user){
			   var uid=""; 
			   if(typeof MP.uid!="undefined"){
				uid="&uid="+MP.uid;
			   //增加本空间读次数
				   addClickUserCount(MP.uid,'boyun_home','jkread',getStorage("userid")+'home'+getLocaldate(),'.M_pcount1',"HomeController_9_1");
				 getSingleData("HomeController_2_2",MP.uid,"M_",function(data){
					   $(".M_pcount").text(data.ncount);
					   $(".M_mcount").text(data.acount);
					   $(".aui-center-title").html( "家庭成员的空间");
				 },false);
				}else  if(typeof MP.userid !="undefined"){
					getSingleData("TranOrderController_12",MP.userid,"M_",function(data){

						$(".M_pcount").text(data.ncount);
						$(".M_mcount").text(data.acount);
						$(".aui-center-title").html( "家庭成员的空间");
					}); 
					addClickUserCount(MP.userid,'boyun_users','jkread',getStorage("userid")+'home1'+getLocaldate(),'.M_pcount1',"HomeController_9");

					//增加本空间读次数
					// jsonPost("/updateSpaceRead.do",{userid:MP.userid},function(data){
								
					// });
				}else{
					
					addClickUserCount(getStorage("userid"),'boyun_users','jkread',getStorage("userid")+'home2'+getLocaldate(),'.M_pcount1',"HomeController_9");
					//增加本空间读次数
					getSingleData("TranOrderController_12",getStorage("userid"),"M_",function(data){
								$(".M_pcount").text(data.ncount);
								$(".M_mcount").text(data.acount);

					});
				}
			addMenus([
			   {"title":"上传文字","url":"fabu.html?type=0"+uid},
			   {"title":"上传照片","url":"fabu.html?type=1"+uid},
			   {"title":"上传视频","url":"fabu.html?type=2"+uid},
			   {"title":"空间装饰","url":"#"},
			   {"title":"联系人工代为编辑","url":"#"},
			   {"title":"开辟（进入）种植园","url":"http://home.boyunweb.com/home/index?v=1"+uid},
			   {"title":"我的评论","url":"quan_1.html","attr":""}],"quanmenu");
			 //增加滚动事件 aui-scrollView tab-panel
				 addPageScroll( ".aui-scrollView",".tab-panel-item");
				 changeSelete();
		 }
 