
		  function openQuanzi(url,title){
			openwin(url+"&title="+encodeURI(title));
		  }
		  callBackUserInfo=function(user){
			$(".mytitles").text(user.name+"�ļ����б�");
			if(!isNull(MP.show)){
				$(".xsycry").hide();
			}
		  }
          myTopColor="#FFFFFF";
		  function sheqing(bid,id,position,pid,obj){
			var text= $(obj).text()+"";
			if(text.indexOf("ȡ��")!=-1){
				alertMsg("�Ƿ�ȡ����Ȩ��",function(){
					  saveTables({"tb_noform":"boyun_home","qx":100,"id":id},function(data){
						alerts("���óɹ���"); 
						reload();
					 },false);
				});
			}else{
				if(pid=="0"){
					alerts("�޷����룬�Է�δע�ᣡ");
					return;
				}
				alertMsg("����鿴��/���ҵ�Ȩ�ޣ�",function(){
					 sendRegMsg("("+pid+")"," ��"+userInfo.name+"������������룬ϣ��ȥ��Ҳιۣ�");
				});
			 }
		  }
		  function upTrees(bid,id,position){
		  
		   getNewData("HomeController_1",{newApi:true},function(data){
				  var isupflag=false;
				  $.each(data.data,function(k,v){
						var ids=homeValue+v.id;
					 	 
						for(var i=0;i<v.counts;i++){
							 var home= ids+"_"+i;
							if( $("."+home).length==0){
							isupflag=true;
								updateTable("HomeController_18",{sql:"",param:"{'p1':'1','p2':'"+i+"','p3':'"+v.id+"','p4':'"+id+"'}"}
									,	function(data){  
										layer.closeAll();alerts("���óɹ�");
										
								});
							}
						}
						  
				  });  
				  if(!isupflag)alerts("�Բ�������û�п�λ��");
			});  
			
		  }
        