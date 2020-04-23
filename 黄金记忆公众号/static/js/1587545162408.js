

		isAppendCssFlag=false;
			function hideUser(){
				hideOrShow(MP.id,1);
			}
		//下载礼物文件
		  callBackInit = function(){
				//隐藏空间按钮
				if(typeof MP.id =="undefined"){
					$(".myeye").hide();
				}
             addHrefOpenAttr();
			 orderType=true;

		 }
		 //禁止返回
		 appBack=function(){
		 }
		 var page_num_now=1;
		 var load_swiper_flag=true;
		 t.scroll_callback_forward_getdata=true;
		 t.scroll_callback_function=function(){
		 if(load_swiper_flag){
			 load_swiper_flag=false;
			 page_num_now++;
			 changeLoadList(nowVaueSelectId );
		 }else{
			 hideLoadingScroll();
		 }
	 }
	   t.maxnum=10;
		 //加载数据
		 var nowVaueSelectId=0;
		 function changeSelete(){
			 var sqls="";

				var temps=$("#temps").html();
						//remenfriend myFriends
						jsonPost("/sqlAction?sqlname=HomeController_13",{newApi:true,
							"param":"{'p1':'"+getStorage("userid")+"','p2':"+((page_num_now-1)*t.maxnum)+",'p3':"+t.maxnum+"}"},function(data){
								//  她她她MLog(data);
							if(data.res==0){
  							 $(".tab-panel-item"+nowVaueSelectId).append(replaceJsonKey(temps,data.data) );
							}
							addHrefOpenAttr();
							if(page_num_now==1){
								if(data.res==0&&data.data.length==t.maxnum){
									load_swiper_flag=true;
								}else{
									load_swiper_flag=false;
								}
							}else
								load_swiper_flag=true;
								$(".showLy").html("好友留言（"+($(".showMyitems").length-1)+"）");
				 });
		 }
		 //自定义回调解析函数

		 function changeLoadList(val){
			 		page_num_now=1;
					nowVaueSelectId=val;
				  $(".tab-panel-item").html("");
					changeSelete();
		 }

		 callBackUserInfo=  function(user){
				if(typeof MP.userid !="undefined"){
					getSingleData("HomeController_2_2",MP.id,"M_",function(data){

					});
					//增加本空间读次数
					 jsonPost("/updateSpaceRead.do",{userid:MP.userid},function(data){
								$(".M_pcount").text(data.ncount);
								$(".M_mcount").text(data.acount);
					 });
				}else{
					//增加本空间读次数
					 jsonPost("/updateSpaceRead.do",{userid:user.id},function(data){
								$(".M_pcount").text(data.ncount);
								$(".M_mcount").text(data.acount);
					 });
					if(user.pic!=""&&user.pic!="null")
					{
						if(user.pic.indexOf("http")!=-1){
								$(".M_pic").attr("src", user.pic);
						}else{
								$(".M_pic").attr("src",domainUrl+user.pic);
						}
					}

					$(".M_name").text(user.name);
				}

			 //增加滚动事件 aui-scrollView tab-panel
				 addPageScroll(".aui-scrollView",".tab-panel");
				 changeSelete();
		 }
 