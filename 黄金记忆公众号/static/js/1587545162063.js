
           myTopColor="#FFFFFF";
		   function shouquan(uid,phone,position,pid){
				layer.open({
                  title:['提示',
                  'background-color:#8DCE16; color:#fff;'],
                  content: '设置权限：<select style="border:1px solid #CCC;background:#FFF;" name="qx" id="qx"><option value="0" selected="selected">一般权限  ?</option> <option value="1">保密权限  ?</option> <option value="2">绝密权限  ?</option>  <option value="100">取消权限  ?</option> </select>'
                  ,btn: ['设置', '取消']
                  ,yes: function(index){
					var qx=$("#qx").find("option:selected").val();

                    updateTable("HomeController_15",{sql:"",param:"{'p1':'"+qx+"','p2':'"+getStorage("userid")+"','p3':'"+phone+"'}"}
                  ,function(data){ 
						 updateTable("HomeController_15_1",{sql:"",param:"{'p1':'"+qx+"','p2':'"+pid+"','p3':'"+userInfo.username+"'}"}
						  ,function(data){  
						   // layer.close(index);reload();
							sendRegMsg("("+pid+")","【"+userInfo.name+"】邀请您去他家参观！",0,function(){
							alerts("已告知对方");reload();
						});
						  });


				  });
                  },no:function(index){
                    layer.close(index); 
                  }
                });
				
			}
        