
           myTopColor="#FFFFFF";
		   function closeHome1(){
				if(typeof MP.id=="undefined"){
					var val=$("input[name='jialist']:checked").val();
					alertMsg("确定要设置为继承人么？",function(){
						jsonPost("/JCRSetring.do",{id:val},function(data){
							alerts("设置成功！"  );
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
					alertMsg("确定分享？",function(){
						jsonPost("/sharesSpace.do",{shareid:MP.id,uids:JSON.stringify(uids)},function(data){
							alerts("分享成功！"  );
							setTimeout(function(){winCloseFinish();},1000);
						});
					});
				}
				
			}
        