
		function inBlack(obj,uid){
			var black=userInfo.fppic+"";
			if(black.indexOf("|"+uid+"|")!=-1){
				black=black.replace("|"+uid+"|","");
			}else{
				black=black+"|"+uid+"|";
			}
			
			 saveTables({"tb_noform":"boyun_users","fppic":black,"id":getStorage("userid")},function(data){
				alerts("���óɹ���"); 
				reload();
			 },false);
		}
		function checkLetter(obj){
			var i=1;
			if($(obj).is(":checked")){
				i=0;
			}
			saveTables({"tb_noform":"boyun_users","clpic":i,"id":getStorage("userid")},function(data){
					if(i==1)
					alerts("���þܾ�˽�ţ�");
					else
					alerts("���ý���˽�ţ�");
					
			 },false);
		}
		function sendLetter(uid,pid,id){ 
				 
		   alertMsg('<textarea id="myText" oninput="splitInputValue(this,200)" placeholder="������ظ�����" style="width:100%;height:100px;padding:2px 4px;"></textarea>',function(){
			   if($("#myText").val()!=""){
					var content = encodeURI($("#myText").val());
					saveTables({"content":content,"tb_noform":"boyun_home_letter","uid":pid,"pid":uid,"stime":new Date().getTime()},function(data){
						saveTables({"tb_noform":"boyun_home_letter","recontent":"RE:&nbsp;"+content,id:id,"htime":new Date().getTime()},function(data){
							reload();
						},true);
					},false);
			   }
		   },"�ظ�˽��");   
		}
        //��������
        var sql="status=0";
        var users;
        callBackUserInfo=function(user){
			users=user;
			if(users.clpic!=1){
				$("#status").prop("checked",true);
			}else{
				$("#status").prop("checked",false);
			}
		   //��������
		   $(function(){ 
			   getLists();
		   });
        }
         t.sql_name="HomeController_27";
         t.scroll_append_div=".message";
         t.maxnum=20;
         newDataApi=true;
         var temp = $(".temp").html();
         page_num=0;
         addPageScroll( );
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
         getNewData(t.sql_name,{newApi:true, "param":"{'p1':'"+getStorage("userid")+"'}"},function(data){ 
           if(data.res==0){
			  
             $.each(data.data,function(k,v){ 
				var black=userInfo.fppic+"";
				if(black.indexOf("|"+v.pid+"|")==-1){
					$(t.scroll_append_div).append(replaceJsonKeys(temp ,v) );
				}else{
					$(t.scroll_append_div).append(replaceJsonKeys(temp ,v).replace("����","�Ƴ�������") );
				}
				
             });
              
           }else{ 
             if(page_num==0)
				$(t.scroll_append_div).html('<div class="col-xs-4 info-item" style="text-align:center;line-height:40px;"> <a href="#"><p>��������</p></a> </div>');
           }
         });
       }
    
        