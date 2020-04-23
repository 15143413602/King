

    		 var users;
    		 callBackUserInfo=function(user){
    			 users=user;
    			 getLists();

    		 }
    		  t.sql_name="TranOrderController_33";
    			t.scroll_append_div=".list0";
    			t.maxnum=20;
    			newDataApi=true;
    			var temp = $(".temp1").html();
    			page_num=0;
    			addPageScroll();
    			t.scroll_callback_forward_getdata=true;

    		 // getLists();
    		 t.scroll_callback_function=function (){
    				 getLists();
    				 page_num++;
    		 };
    		 function getLists(){
           //改变选项卡
           if((".list"+$(".tab-active").attr("data"))!=t.scroll_append_div){
             t.sql_name=$(".tab-active").attr("data-sql");
             t.scroll_append_div=".list"+$(".tab-active").attr("data");
             page_num=0;
             $(t.scroll_append_div).html("");
           }
           var params={};
           if(t.sql_name=="TranOrderController_33"||t.sql_name=="TranOrderController_35"){
               var status=4;
               if($(".tab-active").attr("data")==0)
                   status=4;
                 else {
                   status=0;
                 }
               params={newApi:true, "param":"{'p1':'"+users.id+"','p2':'"+status+"','p3':"+(page_num*t.maxnum)+",'p4':"+t.maxnum+"}"}
           }else{
               params={newApi:true, "param":"{'p1':'"+users.id+"','p2':"+(page_num*t.maxnum)+",'p3':"+t.maxnum+"}"}
           }
    			getNewData(t.sql_name,params,function(data){
    				if(data.res==0){
    					$.each(data.data,function(k,v){
    							var status= v.status;
    							if(status==4)
    								status="可用";
    							else {
    								status="不可用";
    							}
                  if(t.sql_name=="TranOrderController_34"){
                    status="不可用";
                  }
    							$(t.scroll_append_div).append(temp.replace(/\{stime\}/ig,v.stime.split(" ")[0])
                  .replace(/\{etime\}/ig,v.etime.split(" ")[0]).replace(/\{name\}/ig,v.name)
                  .replace(/\{price\}/ig,v.price).replace(/\{status\}/ig,status));
    					});
    					Mflag=true;
    				}else{
    					Mflag=false;

    				}
    			});
    		 }
    		