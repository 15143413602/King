
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
			alertMsg('Ȩ�޼���'+sendQuanx,function(){
		        jsonPost("/sharesSpace.do",{shareid:shareSpaceId,qx:$("#qx").find("option:selected").val()},function(data){
					alerts("����ɹ���");
					addClickCount(shareSpaceId,'boyun_home_quan','zcount','quan','.zcount'+shareSpaceId);
					reload();
				});
		   },"����Ȩ��");  
		}
		function showShare (id){
			shareSpaceId=id;
			commenDiv("#actionSheet");
			
		}
		$("#cancel").click(function(){
			$('.commentDiv').remove();
			$("#actionSheet").hide();
		});
		function showdetail(obj){
			var whilt=$(obj).css("white-space");
			if(whilt=="normal"){
				$(obj).css("white-space","nowrap")
			}else{
				$(obj).css("white-space","normal")
			}
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
		 console.log(page_num_now);
		 changeSelete(  );
		  
	 }
	   t.maxnum=10;
		 //��������
		 var nowVaueSelectId=0;
		 function changeSelete(){
			 var sqls="";
			 var style="display:none;"
				

				var uid=MP.userid;
				if(typeof uid=="undefined"||uid==""||uid=="null"){
					uid=getStorage("userid");
					style="display:block;"
				}else{
					sqls=sqls+ " and qx="+MP.qx;

				}
				if(MP.type=="public"){
					$(".aui-center-title").html( "�����ռ�");
					sqls=" ispublic=1";
				}else if(typeof MP.uid!="undefined"){
					sqls="userid="+MP.uid;
					
				}else{
					sqls=" userid=0 and uid="+uid+ sqls;
				}
				if(nowVaueSelectId==2){
					sqls ="and "+sqls+" and isvideo=1"
				}else{
					if(nowVaueSelectId==1)
					 sqls="and "+sqls+" and stype="+nowVaueSelectId;
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
									$(".tab-panel-item"+nowVaueSelectId).append(replaceJsonKeys(temps,v).replace(/\{style\}/ig,style) );
								}); 
							} 
							addHrefOpenAttr(); 
							if(MP.type=="public") 
								$(".mmdd").remove(); 
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
			   if(typeof MP.uid!="undefined"){
				uid="&uid="+MP.uid;
			   //���ӱ��ռ������
				   addClickUserCount(MP.uid,'boyun_home','jkread',getStorage("userid")+'home'+getLocaldate(),'.M_pcount1',"HomeController_9_1");
				 getSingleData("HomeController_2_2",MP.uid,"M_",function(data){
					   $(".M_pcount").text(data.ncount);
					   $(".M_mcount").text(data.acount);
					   $(".aui-center-title").html( "��ͥ��Ա�Ŀռ�");
				 },false);
				}else  if(typeof MP.userid !="undefined"){
					getSingleData("TranOrderController_12",MP.userid,"M_",function(data){

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
			addMenus([
			   {"title":"�ϴ�����","url":"fabu.html?type=0"+uid},
			   {"title":"�ϴ���Ƭ","url":"fabu.html?type=1"+uid},
			   {"title":"�ϴ���Ƶ","url":"fabu.html?type=2"+uid},
			   {"title":"�ռ�װ��","url":"#"},
			   {"title":"��ϵ�˹���Ϊ�༭","url":"#"},
			   {"title":"���٣����룩��ֲ԰","url":"http://home.boyunweb.com/home/index?v=1"+uid},
			   {"title":"�ҵ�����","url":"quan_1.html","attr":""}],"quanmenu");
			 //���ӹ����¼� aui-scrollView tab-panel
				 addPageScroll( ".aui-scrollView",".tab-panel-item");
				 changeSelete();
		 }
 