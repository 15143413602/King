
           myTopColor="#FFFFFF";
		   function shouquan(uid,phone,position,pid){
				layer.open({
                  title:['��ʾ',
                  'background-color:#8DCE16; color:#fff;'],
                  content: '����Ȩ�ޣ�<select style="border:1px solid #CCC;background:#FFF;" name="qx" id="qx"><option value="0" selected="selected">һ��Ȩ��  ?</option> <option value="1">����Ȩ��  ?</option> <option value="2">����Ȩ��  ?</option>  <option value="100">ȡ��Ȩ��  ?</option> </select>'
                  ,btn: ['����', 'ȡ��']
                  ,yes: function(index){
					var qx=$("#qx").find("option:selected").val();

                    updateTable("HomeController_15",{sql:"",param:"{'p1':'"+qx+"','p2':'"+getStorage("userid")+"','p3':'"+phone+"'}"}
                  ,function(data){ 
						 updateTable("HomeController_15_1",{sql:"",param:"{'p1':'"+qx+"','p2':'"+pid+"','p3':'"+userInfo.username+"'}"}
						  ,function(data){  
						   // layer.close(index);reload();
							sendRegMsg("("+pid+")","��"+userInfo.name+"��������ȥ���Ҳιۣ�",0,function(){
							alerts("�Ѹ�֪�Է�");reload();
						});
						  });


				  });
                  },no:function(index){
                    layer.close(index); 
                  }
                });
				
			}
        