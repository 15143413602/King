

		isAppendCssFlag=false;
			function hideUser(){
				hideOrShow(MP.id,1);
			}
		//���������ļ�
		  callBackInit = function(){
				//���ؿռ䰴ť
				if(typeof MP.id =="undefined"){
					$(".myeye").hide();
				}
             addHrefOpenAttr();
			 orderType=true;

		 }
		 //��ֹ����
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
		 //��������
		 var nowVaueSelectId=0;
		 function changeSelete(){
			 var sqls="";

				var temps=$("#temps").html();
						//remenfriend myFriends
						jsonPost("/sqlAction?sqlname=HomeController_13",{newApi:true,
							"param":"{'p1':'"+getStorage("userid")+"','p2':"+((page_num_now-1)*t.maxnum)+",'p3':"+t.maxnum+"}"},function(data){
								//  ������MLog(data);
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
								$(".showLy").html("�������ԣ�"+($(".showMyitems").length-1)+"��");
				 });
		 }
		 //�Զ���ص���������

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
					//���ӱ��ռ������
					 jsonPost("/updateSpaceRead.do",{userid:MP.userid},function(data){
								$(".M_pcount").text(data.ncount);
								$(".M_mcount").text(data.acount);
					 });
				}else{
					//���ӱ��ռ������
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

			 //���ӹ����¼� aui-scrollView tab-panel
				 addPageScroll(".aui-scrollView",".tab-panel");
				 changeSelete();
		 }
 