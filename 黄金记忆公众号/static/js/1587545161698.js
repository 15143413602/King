myTopColor="#FFFFFF";
				function regClick(){
					var type=$("input[name='type']:checked").val();
					userReg(function(data){
						setStorage("userid",data.id);
						alerts(data.error_msg);
						if(type==0&&data.error==0){
							var username=$("input[name='username']").val();
								getNewData("HomeController_2_3",{newApi:true,param:"{'p1':'"+username+"'}"},function(data){
									if(data.res==0&&data.data.length>0){
										alertMsg("���Ѿ�����"+data.data.length+"������������Ա���Ƿ��������鿴��",function(){
 												var pushUserUidList=[],pushphones=[];
												$.each(data.data,function(k,v){
													pushUserUidList.push(v.uid);
													pushphones.push(v.phone);
												});
												//���ͺ���
							          jsonPost("/sendSpaceContent.do",{sql:encodeURI(jsonToString(pushUserUidList)),uids:encodeURI(JSON.stringify(pushUserUidList)),type:1,
							          content:encodeURI("���ļ����Ա�ֻ�β�š�"+username.substring(7)+"������鿴������˽Ȩ�ޡ�"),sql:encodeURI(jsonToString(pushphones))},function(data){
							                setTimeout(function(){winCloseFinish();},1000);
							          });
										});
									}else{
											setTimeout(function(){ winCloseFinish();},1000);
									}

								});


						}else
						if(data.error==0)
							 location.href='reg_1.html';
						});
				}
				$(".WellRadioH").find("label").each(function(){
					$(this).click(function(){
						  $("label").removeClass("mt-tabpage-item-cur");
							$(this).addClass("mt-tabpage-item-cur");
					});
				});
			