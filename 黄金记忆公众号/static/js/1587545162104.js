

		 var users;
		 callBackUserInfo=function(user){
			 users=user;
			 getLists();

		 }
		  t.sql_name="TranOrderController_40";
			t.scroll_append_div=".message";
			t.maxnum=20;
			newDataApi=true;
			var temp = '<li> <a href="javascript:void(0)"> <h2>{title}</h2> <p class="time">{time}</p> <p class="text">{content}</p> <i class="iconfont">&#xe611;</i> </a> </li>';
			page_num=0;
			addPageScroll();
			t.scroll_callback_forward_getdata=true;

		 // getLists();
		 t.scroll_callback_function=function (){
				 getLists();
				 page_num++;
		 };
		 function getLists(){
			getNewData(t.sql_name,{newApi:true, "param":"{'p1':'"+users.id+"','p2':"+(page_num*t.maxnum)+",'p3':"+t.maxnum+"}"},function(data){
				if(data.res==0){
					$.each(data.data,function(k,v){
							var status= v.status;
							if(status==0)
								status="Î´¶Á";
							else {
								status="ÒÑ¶Á";
							}
							$(t.scroll_append_div).append(temp.replace(/\{time\}/ig,new Date(parseInt(v.stime)).toLocaleDatetime() ).replace(/\{title\}/ig,v.title).replace(/\{content\}/ig,v.content));
					});
					Mflag=true;
				}else{
					Mflag=false;

				}
			});
		 }
		