
           myTopColor="#FFFFFF";
		   function closeHome1(){
				if(typeof MP.id=="undefined"){
					var val=$("input[name='jialist']:checked").val();
					alertMsg("ȷ��Ҫ����Ϊ�̳���ô��",function(){
						jsonPost("/JCRSetring.do",{id:val},function(data){
							alerts("���óɹ���"  );
							setTimeout(function(){winCloseFinish();},1000);
						});
					});
				}else{
					var values=[];
					var uids=[];
					$("input[name='jialist']").each(function(){
						 if($(this).is(":checked")){
							 values.push($(this).attr("value"));
							 uids.push(parseInt($(this).attr("data")));
						 }
					}); 
					var val=$("input[name='jialist']:checked").attr("data");
					alertMsg("ȷ������",function(){
						jsonPost("/sharesSpace.do",{shareid:MP.id,uids:JSON.stringify(uids)},function(data){
							alerts("����ɹ���"  );
							setTimeout(function(){winCloseFinish();},1000);
						});
					});
				}
				
			}
        