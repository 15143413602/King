

		 var users;
		 callBackUserInfo=function(user){
			 users=user;
			 getLists(1);

		 }
			t.sql_name="TranOrderController_36_1";
			t.scroll_append_div=".list0";
			t.maxnum=20;
			newDataApi=true;
			var temp = $(".temp1").html();
			page_num=0;
			addPageScroll();
			t.scroll_callback_forward_getdata=true;

		 // getLists();
		 t.scroll_callback_function=function (){
				 getLists(null);
				 page_num++;
		 };
		 function getLists(obj){

			 //改变选项卡
			if(obj!=null){
				page_num=0;
			  $(".order").find("li").removeClass("current");
				$(".order").find("li").eq(obj).addClass("current");
				$(t.scroll_append_div).html("");
			}
		   t.sql_name=$(".current").attr("data-sql");
			 t.scroll_append_div=".list"+$(".current").attr("data");
			 var params= {newApi:true, sql:$(".current").attr("data-v"),"param":"{'p1':'"+users.id+"','p2':"+(page_num*t.maxnum)+",'p3':"+t.maxnum+"}"}
			getNewData(t.sql_name,params,function(data){
				if(data.res==0){
					$.each(data.data,function(k,v){
						var status=v.status;
						var url="javascript:void(0);";
						if(status==5)
							url="huo-detail10.html?id="+v.id;
							$(t.scroll_append_div).append(temp.replace(/\{xdsj\}/ig,new Date(parseInt(v.xdsj)).toLocaleDatetime())
							.replace(/\{fhdz\}/ig, v.fhdz ).replace(/\{shrdz\}/ig, v.shrdz ).replace(/\{url\}/ig, url )
							.replace(/\{cartypename\}/ig,v.cartypename).replace(/\{id\}/ig,v.id).replace(/\{jcfy\}/ig,v.jcfy).replace(/\{status\}/ig,getOrderStatus(status)));
					});
					Mflag=true;
				}else{
					Mflag=false;

				}
			});
		 }
		 //重新下单
		 function reSubOrder(id){
			 jsonPost("/carRabTranOrder.do",{carname:"",paystatus:0,carsjh:"",status:0,caruid:0,id:id,jdsj:new Date().getTime()},function(data){
	       if(data.error==0){
	           location.href="xiadian-detail.html?id="+id;
	       }
	    });
		 }
		