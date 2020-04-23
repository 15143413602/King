
        //加载数据
        var sql="status=0";
        var users;
        callBackUserInfo=function(user){
                users=user;
               //加载数据
               $(function(){
                   updateLocation();
                   getLists();
               });
			   //取消消息信息
			   jsonPost("/update.do?t=TranOrderController_46",{sql:"",newApi:true, "param":"{'p1':'0','p2':'"+getStorage("userid")+"'}"},function(data){ 
			   });
        }
         t.sql_name="HomeController_14";
         t.scroll_append_div=".aui-news-box";
         t.maxnum=20;
         newDataApi=true;
         var temp = $(".temp").html();
         page_num=0;
         addPageScroll(".aui-scrollView",'.aui-news-box');
         t.scroll_callback_forward_getdata=true;

         // getLists();
         t.scroll_callback_function=function (){
		 page_num++;
            getLists();
            
         };
         function getLists(){
          if(typeof(users)=="undefined"){
            getLists();
            return;
          };
         getNewData(t.sql_name,{newApi:true, "param":"{'p1':'"+getStorage("userid")+"','p2':"+(page_num*t.maxnum)+",'p3':"+t.maxnum+"}"},function(data){ 
           if(data.res==0){
			  
             $.each(data.data,function(k,v){
				 if(v.types==2)
                 $(t.scroll_append_div).append(replaceJsonKeys(temp ,v).replace(/hides1/ig,""));
				 else if(v.types==1)
				 $(t.scroll_append_div).append(replaceJsonKeys(temp ,v).replace(/hides2/ig,""));
				 else
				$(t.scroll_append_div).append(replaceJsonKeys(temp ,v) );
             });
             Mflag=true;
           }else{
             Mflag=false;
             if(page_num==0)
             $(t.scroll_append_div).html('<div class="col-xs-4 info-item" style="text-align:center;line-height:40px;"> <a href="#"><p>暂无数据</p></a> </div>');
           }
         });
       }
         function queConform(obj,num){
			var that=$(obj);
			var id=that.attr("data-id");
			var type=that.attr("data-type");
			var fid=that.attr("data-fid");
			var phone=that.attr("data-phone");
			//
            saveTables({"tb_noform":"boyun_home_msg","id":$(obj).attr("data-id"),"status":1},function(data){
              
              if(num=="0"){
               layer.open({
                  title:['提示',
                  'background-color:#8DCE16; color:#fff;'],
                  content: $(obj).text()
                  ,btn: ['知道了']
                  ,yes: function(index){
                    layer.close(index);

                  },no:function(index){
                    layer.close(index);
                  }
                });
             }else if(num==1){
				//$(obj).parent().hide();
				jsonPost("/agreeLinks.do",{uid:fid,name:encodeURI(userInfo.name)},function(data){
					alerts(data.error_msg);
					$(obj).parent().hide();
				});
			 }else if(num==2){
				alerts("暂不联系");
				$(obj).parent().hide();
			 }else if(num==3){
               layer.open({
                  title:['提示',
                  'background-color:#8DCE16; color:#fff;'],
                  content: $(obj).find("p").text()+'<select style="border:1px solid #CCC;background:#FFF;" name="qx" id="qx"><option value="0" selected="selected">公开权限  ?</option> <option value="1">保密权限  ?</option> <option value="2">绝密权限  ?</option> </select>'
                  ,btn: ['设置', '取消']
                  ,yes: function(index){
				  var qx=$("#qx").find("option:selected").val();

                    updateTable("HomeController_15",{sql:"",param:"{'p1':'"+qx+"','p2':'"+getStorage("userid")+"','p3':'"+$(obj).attr("data-phone")+"'}"}
                  ,function(data){  layer.close(index);
						
						 updateTable("HomeController_15_1",{sql:"",param:"{'p1':'"+qx+"','p2':'"+fid+"','p3':'"+userInfo.username+"'}"}
						  ,function(data){  
						  sendRegMsg("("+fid+")","【"+userInfo.name+"】同意了你的参观申请，你可以随时前往"+userInfo.name+"家参观！",0,function(){
							alerts("已告知对方同意参观");reload();
						});
						  });
				  });
				 
                  },no:function(index){
                    layer.close(index);

                  }
                });
             }else{
				alerts("已拒绝");
				$(obj).parent().hide();
			 }


           },false);

         }
         $(".aui-news-item").each(function(){
           $(this).click(function(){
             var val=$(this);
             queConform(val);
           });
         });
        