
		//���Դ�Ϊ�༭��̨
		function feedFack(){
			alertMsg('<textarea id="myText" oninput="splitInputValue(this,200)" placeholder="����ռ����˵��" style="width:100%;height:100px;padding:2px 4px;"></textarea>',function(){
					   if($("#myText").val()!=""){
							saveTables({"name":encodeURI(userInfo.name),"title":encodeURI("��"+userInfo.name+"���ռ����"),"content":encodeURI($("#myText").val()),"tb_noform":"boyun_feedback","username":userInfo.username,"uid":getStorage("userid"),"stime":new Date().getTime()},function(data){
								alerts("�����ѷ��ͣ���ȴ���ϵ��");
							},false);
					   }
				   },"����˵��");  
		}
		//�鿴��ϸ
		var querystring="";
		function openAbout(){
			openwin('./html/illus.html?'+querystring)
		}
		//����˽��
		function sendLetter(uid){ 
			getSingleData("TranOrderController_12",uid,"M2_",function(data){
					if(data.clpic==1){
						alerts("�û���ֹ����˽�ţ�");
						return;
					}
					var black=data.fppic+"";
					if(black.indexOf("|"+uid+"|")!=-1){
						alerts("���Ѿ������ڣ�");
						return;
					} 
					alertMsg('<textarea id="myText" oninput="splitInputValue(this,200)" placeholder="��������������" style="width:100%;height:100px;padding:2px 4px;"></textarea>',function(){
					   if($("#myText").val()!=""){
							saveTables({"content":encodeURI($("#myText").val()),"tb_noform":"boyun_home_letter","uid":uid,"pid":getStorage("userid"),"stime":new Date().getTime()},function(data){
							
							},true);
					   }
				   },"����˽��");  

		   });
		    
		}
       if(isAppType==1){
		
			addBlankSpace();
			addplugsUpload("chose_pic_btn","aui-upload-pic","ossfile","postfiles","image/*","",1,true);
			//���ӵ���¼� �滻onclick
			$("#touxiang").attr("onclick",$("#chose_pic_btn1").attr("onclick"));
		}
		uploadCallback=function(pic){
		 if(typeof MP.uid!="undefined"){
			saveUsers({pic:pic,tb_noform:"boyun_home",id:MP.uid},function(){
              getUserInfos();
            });
		 }else  if(typeof MP.userid!="undefined"){
		//	saveUsers({pic:pic,tb_noform:"boyun_home",id:MP.uid},function(){
          //    getUserInfos();
        //   });
		 }else{
		   saveUsers({pic:pic},function(){
              getUserInfos();
           });
		 } 
       }
		//������ϵͳ�û���Ϣ
		isLoadUserInfo=false;
  //	���������
		var shareSpaceId=0;
		function shareMyFriend(){
			openwin('./html/list_1.html?show=true&id='+shareSpaceId);
		}
		function shareMySpace(){
			alertMsg('ȷ��Ҫ������̨����������' ,function(){
				saveTables({tb_noform:"boyun_home_quan","id":shareSpaceId,sharebg:1},function(){
				addClickCount(shareSpaceId,'boyun_home_quan','fcount','squan','.fcount'+shareSpaceId);
				},false); 
		   },"������ʾ");   
		}
		function sharepublicSpace(){
			
			layer.open({
				content: '���������ռ�'
				,btn: ['����Ķ�', '�շ��Ķ�' ]
				,skin: 'footer'
				,yes: function(index){
					/*	alertMsg('��ѡ�������Ŀ<select name="wztype"   id="wztype" class="form-control"> <option value="0">����</option> <option value="1">����</option> <option value="2">����</option> <option value="3">����</option> </select>' ,function(){
							saveTables({tb_noform:"boyun_home_quan","id":shareSpaceId,ispublic:1,wztype:$("#wztype").find("option:selected").val()},function(){
							addClickCount(shareSpaceId,'boyun_home_quan','fcount','squan','.fcount'+shareSpaceId);
							},false);   
							
				   },"������ʾ");*/
				   openwin('./shareset.html?id='+shareSpaceId+"&show=true");
					
				},no:function(index){
					openwin('./shareset.html?id='+shareSpaceId);
				}
			  }); 
			  $(".commentDiv").trigger("click");
		}
		function showShare (id){
			shareSpaceId=id;
			commenDiv("#actionSheet");
			
		}
		$("#cancel").click(function(){
			$('.commentDiv').remove();
			$("#actionSheet").hide();
		});
		function showdetail(obj,iscost , showlen , readtype , money,id){
			//�滻�����йؼ���
			 
			 var par = $(obj).parent();
			 //�������ر�
			 var o = $(".showid"+id);
			 setStorage("pid",id);
			 var content = o.html();
			 //��������
 			 var filter=o.attr("data-value")+"";
			 if(filter!=""){
				 var patt2 = new RegExp(filter, "ig");
				 content = content.replace(patt2, "**");
 				 o.html(content);
 			 }
			 //���ݳ���
			 var len = o.length/100;
			 getSqlData("HomeController_24","",[getStorage("userid"),id],function(data){
					
					if(data.error==0&&data.data.status==1){
						 par.hide();o.show();
					}else{
						
						 alertMsg('��Ҫ֧��������Ķ���' ,function(){
								 if(readtype==0){
									pay(money,function(data){
										if (data.error == 0) {chargeMoney(money);
											   par.hide();o.show();
										} else {
												alerts("֧��ʧ��");
										}
								   });
								 }else{
									if(len<1)
										len=1; 
									pay(len*money,function(data){
										if (data.error == 0) {chargeMoney(money);
											   par.hide();o.show();	
										} else {
												alerts("֧��ʧ��");
										}
								   });
								 }
							},"��ܰ��ʾ");   
					}
				
			 });
			
		}
       
		function onshowClick(obj,pass){
			callPassWord("�����������",function(data){
				if(data.pwd==pass){
					$(obj).hide();
					isPwdInput.close();
				}else{
					if((data.pwd+"").length==6){
						alerts("�������");
					}
				}
			});
		}
		isAppendCssFlag=false;
		function hideUser(){
			//hideOrShow(MP.id,1);
			hideController(MP.id);
		}
		//���������ļ�
	   callBackInit = function(){
			//���ؿռ䰴ť
			if(typeof MP.id =="undefined"){
				$(".myeye").hide();
			}
 			if(  MP.type=="public"){
				$(".aui-head-box2").show();
			}else{
				$(".aui-head-box1").show();
				
 			}
			 if(typeof MP.userid!="undefined"){
				$("#touxiang").attr("onclick","");
			 }
            addHrefOpenAttr();
		    orderType=true;
 		 //��������
		 getNewData("HomeController_3",{newApi:true},function(data){
			if(data.res==0){ 
				  var countNum=0;
				 $.each(data.data,function(k,v){
							//��������
						//��������
						if(isAppType==0)
							savePicture(domainUrl+v.pic);
						var json = {};
						var url =v.pic+"";
						var name =url.substring(url.lastIndexOf("/")+1);
						json.pic=url;
						json.normal='fs://'+name;
						json.highlight='fs://'+name;
						json.giftName=v.title;    //�ַ������ͣ���ť�±ߵ���������
						json.price=v.prize;          //�ַ������ͣ�����۸��ǩ�ı�
						json.title=v.title;
						json.prize=v.prize;
						showGiftList+='<a onclick="clickGifShow('+countNum+')" href="javascript:;" '+
						' data="'+countNum+'" '+
						' class="gifts"><img src="'+url+'"><p>'+v.title+'<span style="color:red;font-size:11px;">[��'+v.prize+']</span></p></a>';
						 
						gifts.push(json);
						countNum++;
				 });
				} 
		 });

		 }
		 //��ֹ����
		 appBack=function(){
		 } 
		 var load_swiper_flag=true;
		 t.scroll_callback_forward_getdata=true;
		 t.scroll_callback_function=function(){
		   
		 page_num_now++; 
		 changeSelete(  );
		  
	 }
	   t.maxnum=10;
		 //��������
		 var nowVaueSelectId=1;
		 function changeSelete(){
			 var sqls="";
			 var style="display:none;" 
				var uid=MP.userid;
				if(typeof uid=="undefined"||uid==""||uid=="null"){
					uid=getStorage("userid");
 				} 
				if(MP.type=="public"){
					$(".aui-center-title").html( "�����ռ�");
					sqls=" ispublic=1 and wztype="+(nowVaueSelectId<3?0:nowVaueSelectId-3);
				}else if(typeof MP.uid!="undefined"){
					sqls="userid="+MP.uid;
					if(!isNull(MP.mqx)){
						var qx=parseInt(MP.mqx);
						if(qx<1){
							sqls=" uid="+MP.nuid+" and  userid="+MP.uid+" and qx="+qx;
						}else if(qx>=1 && qx<2){
							sqls="  uid="+MP.nuid+" and userid="+MP.uid+" and qx in(0,1)" ;
						}else{
							sqls="  uid="+MP.nuid+" and userid="+MP.uid+"" ;
						}
						querystring="show=true&userid="+MP.uid;
						$(".myeye").hide();
						$("#quanmenu").hide();
					} else{
						querystring="userid="+MP.uid;
						
					}
					
					
				}else  if(typeof MP.userid!="undefined"){
					sqls=" puid="+getStorage("userid")+" and uid="+MP.userid;
					$("#quanmenu").hide();
					querystring="userid="+MP.userid;
				}else if(typeof MP.look!="undefined"){
					sqls=" uid="+MP.look+" and qx="+MP.qx;
					var qx=parseInt(MP.qx);
					if(qx<1){
						sqls=" uid="+MP.look+" and qx="+MP.qx;
					}else if(qx>=1 && qx<2){
						sqls=" uid="+MP.look+" and qx in(0,1)" ;
					}else{
						sqls=" uid="+MP.look+"" ;
					}
					querystring="userid="+MP.look;
				}else{
					sqls=" userid=0 and uid="+uid+ sqls;
					querystring="uid="+uid;
				}
				if(nowVaueSelectId==2){
				//	sqls ="  "+sqls+" and isvideo=1"
				}else{
					//if(MP.type!="public")
				//	 sqls="  "+sqls+" and stype="+nowVaueSelectId;
					
				}
 				var temps=$("#temps").html();
				//remenfriend myFriends
				jsonPost("/sqlAction?sqlname=HomeController_4",{newApi:true,sql:sqls,
					"param":"{ 'p1':"+((page_num_now-1)*t.maxnum)+",'p2':"+t.maxnum+"}"},function(data){
						//  ������MLog(data);
					
					if(data.res==0){
						 
						$.each(data.data,function(k,v){
							if(getStorage("userid")!=v.uid){
								style="display:none;"
							}else{
								style="";
							}
							if(v.iscost==0||MP.type!="public"){
								var title = v.content+"";
								 //��������
 								 var filter=v.keyword+"";
								 if(filter!=""){
									 var patt2 = new RegExp(filter, "ig");
									 if(v.ispublic==1&&MP.type=="public")
										title = title.replace(patt2, v.repkey);
 								 }
								$(".tab-panel-item"+nowVaueSelectId).append(replaceJsonKeys(temps,v).replace(/\{style\}/ig,style)
									.replace(/\{content_1\}/ig,title)  );
							}else{
								var content = v.content+"";
								var len = content.length;
								var showlen=parseInt(v.showlen);
								if(showlen>len)
									showlen=len;
								 var title = content.substring(0,showlen);
								 //��������
 								 var filter=v.keyword+"";
								 if(filter!=""){
									 var patt2 = new RegExp(filter, "ig");
									  if(v.ispublic==1&&MP.type=="public"){
										title = title.replace(patt2, v.repkey);
										content = content.replace(patt2, v.repkey);
									 }
 								 }
								content = title+'<i href="javascript:;" onclick="showdetail(this,'+v.iscost+','+v.showlen+','+v.readtype+','+v.money+','+v.id+')" style="font-style: normal; padding: 0 10px; color: blue;">�鿴����>></i>';
								$(".tab-panel-item"+nowVaueSelectId).append(replaceJsonKeys(temps,v).replace(/\{style\}/ig,style)
									.replace(/\{content_1\}/ig,content) );
							}
						}); 
					} 
					addHrefOpenAttr(); 
					if(MP.type!="public"){
						$(".mmdd").hide(); 
						$(".classhow"+getStorage("userid")).each(function(){
							$(this).find(".mmdd").show(); 
						}); 
						//$(".pinglun").html('����&nbsp; <font class="pcount{id}">{pcount}</font>');
					}else{
						$(".showpublic").show();
						$(".mmdd").hide(); 
					}
				 });
		 }
		 //�Զ���ص���������
		 function jsonDefineCall(string,v){
			 //����ʵ��ʾ��������
				 if(v.pass==""){
			 			return string.replace(/\{passhide\}/ig,"display:none;");
			   }else{
					  if(parseInt(v.passtime)<(new Date().getTime())){
							return string.replace(/\{passhide\}/ig,"display:none;");
						}else{
							return string.replace(/\{passhide\}/ig,"display:block;");
						}

				 }
		 }
		 function changeLoadList(val){
			 		page_num_now=1; 
					nowVaueSelectId=val;
					Mflag=true;
				  $(".tab-panel-item").html("");
					changeSelete();
		 }
		 
		 callBackUserInfo=  function(user){
			   var uid=""; 
			   if(MP.type=="public"){
				uid="&public=true";
			   }
			   if(typeof MP.uid!="undefined"){
				  uid="&uid="+MP.uid+"&pid="+MP.pid;
					//���ӱ��ռ������
				   addClickUserCount(MP.uid,'boyun_home','jkread',getStorage("userid")+'home'+getLocaldate(),'.M_pcount1',"HomeController_9_1");
				 getSingleData("HomeController_2_2",MP.uid,"M_",function(data){
					   $(".M_pcount").text(data.ncount);
					   $(".M_mcount").text(data.acount);
					   $(".aui-center-title").html( decodeURI(MP.title)+"����ҳ");
				 },false);
				}else  if(typeof MP.userid !="undefined" ){
					getSingleData("TranOrderController_12",MP.userid,"M_",function(data){ 
						$(".M_pcount").text(data.ncount);
						$(".M_mcount").text(data.acount);
						$(".aui-center-title").html( decodeURI(MP.title)+"����ҳ");
					}); 
					addClickUserCount(MP.userid,'boyun_users','jkread',getStorage("userid")+'home1'+getLocaldate(),'.M_pcount1',"HomeController_9");

					//���ӱ��ռ������
					// jsonPost("/updateSpaceRead.do",{userid:MP.userid},function(data){
								
					// });
				}else  if(typeof MP.look !="undefined" ){
					getSingleData("TranOrderController_12",MP.look,"M_",function(data){

						$(".M_pcount").text(data.ncount);
						$(".M_mcount").text(data.acount);
						$(".aui-center-title").html( "��ͥ��Ա�Ŀռ�");
					}); 
					addClickUserCount(MP.userid,'boyun_users','jkread',getStorage("userid")+'home1'+getLocaldate(),'.M_pcount1',"HomeController_9");

					//���ӱ��ռ������
					// jsonPost("/updateSpaceRead.do",{userid:MP.userid},function(data){
								
					// });
				}else{
					
					addClickUserCount(getStorage("userid"),'boyun_users','jkread',getStorage("userid")+'home2'+getLocaldate(),'.M_pcount1',"HomeController_9");
					//���ӱ��ռ������
					getSingleData("TranOrderController_12",getStorage("userid"),"M_",function(data){
						$(".M_pcount").text(data.ncount);
						$(".M_mcount").text(data.acount); 
					});
				} 
				getNewData("TranOrderController_12",{newApi:true,param:"{'p1':'"+getStorage("userid")+"'}"}, function(data){
					  userInfo=data.data[0];
					 
				});
			addMenus([
			   {"title":"�ϴ�����","url":"fabu.html?type=0"+uid},
			   {"title":"�ϴ���Ƭ","url":"fabu.html?type=1"+uid},
			   {"title":"�ϴ���Ƶ","url":"fabu.html?type=2"+uid},
			   {"title":"�ռ�װ��","url":"#"},
			   {"title":"��ϵ�˹���Ϊ�༭","url":"javascript:feedFack()"},
			   {"title":"���٣����룩��ֲ԰","url":"http://home.boyunweb.com/home/index?v=1"+uid},
			   {"title":"�ҵ�����","url":"quan_1.html","attr":""}],"quanmenu");
			 //���ӹ����¼� aui-scrollView tab-panel
				 addPageScroll( ".aui-scrollView",".tab-panel-item");
				 changeSelete();
				// 
		 }
 