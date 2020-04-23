
myTopColor="#f36a30";
		 var users;
		 callBackUserInfo=function(user){
			 users=user;
			 getLists();

		 }
		  t.sql_name="TranOrderController_27";
			t.scroll_append_div=".bodys";
			t.maxnum=20;
			newDataApi=true;
			var temp = '<tr> <td>{time}</td> <td>{money}</td> <td>{status}</td> </tr>';
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
								status="待处理";
							else {
								status="已打款";
							}
							$(t.scroll_append_div).append(temp.replace(/\{time\}/ig,v.stime.split(" ")[0]).replace(/\{money\}/ig,"￥"+v.money).replace(/\{status\}/ig,status));
					});
					Mflag=true;
				}else{
					Mflag=false;

				}
			});
		 }
		