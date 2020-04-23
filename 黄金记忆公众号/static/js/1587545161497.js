
		function openSpace(){
			openwin("../quan.html?userid="+nowUid+"&qx="+nowQx+"&id="+nowDid+"&username="+nowUsername);
		}
		function openHome(){
			if(nowQx==2){

				openwin("./index_2.html?userid="+nowUid+"&qx="+nowQx+"&id="+nowDid+"&username="+nowUsername);
			}else{
				alerts("您的权限不足！");
			}
		}
		//去打开空间
		var nowUid=0,nowQx=100,nowUsername="",nowDid=0;
		function showUserSpace(obj,qx,uid,username,did){
				  var homes=username.substring(7);
			   if(qx>5){
					 alertMsg("您权限不足,立即申请权限。",function(){
 							 var pushUserUidList=[ ],pushphones=[ ];
							 pushUserUidList.push(uid);
							 pushphones.push(username);
							 //推送好友
							 jsonPost("/sendSpaceContent.do",{sql:encodeURI(jsonToString(pushUserUidList)),uids:encodeURI(JSON.stringify(pushUserUidList)),type:1,
							 content:encodeURI("您的家族成员手机尾号“"+homes+"”申请查看您的隐私权限。"),sql:encodeURI(jsonToString(pushphones))},function(data){
								 	  	alerts("已申请成功！等待对方核审！");
									  setTimeout(function(){location.reolad();},1000);

							 });
					 });
				 }else{

					 $(".aaa").html("手机尾号"+homes+"空间");
					 $(".bbb").html("手机尾号"+homes+"家谱");
					  openwin("../quan.html?userid="+nowUid+"&qx="+nowQx);
					 	$(".myfooter").show();
						nowUid=uid;
						nowQx=qx;
						nowDid=did;
						nowUsername=username;
				 }
		}
		var isLeftFlag=true;
		var stepNum=0;
		var stepRightNum=0;
		var num1=0;num2=0;
		function addLeaf(counts,v){
			var nums=counts/2;
			var height =700;// api.frameHeight;
			$(".banner").css("height",height+"px");
			//生成随机数
			 if(num1>3)num1=0;if(num2>3)num2=0;
			 //是否新消息
			 var hasMsg="";
			 if(v.counts!="0"&&v.counts!=""){
				 hasMsg="shuandong";
			 }
			 var usernames=v.username;
			 usernames = usernames.substring(7);
 			if(isLeftFlag){

				$(".banner").append('<div onclick="showUserSpace(this,'+v.qx+','+v.uid+',''+v.username+'','+v.did+')" style="top:'+stepNum+'px" class="imgLeftDiv imgLeftDiv'+num1
				+'"><img class="leftImg '+hasMsg+' leftImg'+num1+'" src="../image/treee_10.png"><p class="shuandong">来自手机尾号'+usernames+'</p></div>');
				isLeftFlag=false;
				stepNum+=height/nums+parseInt(Math.random()*10) ;num1++;
			}else{
				$(".banner").append('<div onclick="showUserSpace(this,'+v.qx+','+v.uid+',''+v.username+'','+v.did+')" style="top:'+stepRightNum+'px" class="imgRightDiv  imgRightDiv'+num2
				+'"><img class="rightImg  '+hasMsg+' rightImg'+num2+' " src="../image/treee_11.png"><p>来自手机尾号'+usernames+'</p></div>');
				isLeftFlag=true;
				stepRightNum+=height/nums+parseInt(Math.random()*10) ;num2++;
			}

		}
		//是否 闪烁
		 setInterval(function(){
			$(".shuandong").each(function(){

					var src=$(this).attr("src")+"";
					var color=$(this).attr("style")+"";
					var newsrc="";
					if(src.indexOf("treee0")!=-1)
						newsrc=src.replace("treee0","treee");
					else
						newsrc=src.replace("treee","treee0");
					if(color.indexOf("255")!=-1 )
						$(this).css("color","#000");
					else//color: rgb(255, 255, 255);
						$(this).css("color","#FFF");
					$(this).attr("src",newsrc);
			});
		},1000);
		callBackUserInfo=function(user){

			var userids=getStorage("userid");
			if(typeof MP.userid!="undefined")
			 userids=MP.userid;
			var column=4;
			var height= api.winHeight-130;
					$(".banner").css("height",height+"px");
				 getNewData("HomeController_2_1",{newApi:true,param:"{'p1':'"+user.username+"','p2':'"+userids+"'}"},function(data){
					 if(data.res==0){
						 var length= data.data.length;
 	 					  $.each(data.data,function(k,v){
							 		addLeaf( length,v);
							});
						}
				 });

		}

		