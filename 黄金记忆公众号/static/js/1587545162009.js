
		var isLeftFlag=true;
		var stepNum=0;
		var stepRightNum=0;
		var num1=0;num2=0;
		function addLeaf(counts,v){
			var nums=counts/2;
			var height =700;// api.frameHeight;
			$(".banner").css("height",height+"px");
			//���������
			 if(num1>3)num1=0;if(num2>3)num2=0;
			 //�Ƿ�����Ϣ
			 var hasMsg="";
			 if(v.counts!="0"&&v.counts!=""){
				 hasMsg="shuandong";
			 }
			 var usernames=v.username;
			 usernames = usernames.substring(7);
 			if(isLeftFlag){

				$(".banner").append('<div onclick="showUserSpace(this,'+v.qx+','+v.pid+',''+v.username+'','+v.did+','����'+v.bname+'')" style="top:'+stepNum+'px" class="imgLeftDiv imgLeftDiv'+num1
				+'"><img class="leftImg '+hasMsg+' leftImg'+num1+'" src="../image/treee_10.png"><p class="shuandong">���� '+v.bname+'</p></div>');
				isLeftFlag=false;
				stepNum+=height/nums+parseInt(Math.random()*10) ;num1++;
			}else{
				$(".banner").append('<div onclick="showUserSpace(this,'+v.qx+','+v.pid+',''+v.username+'','+v.did+','����'+v.bname+'')" style="top:'+stepRightNum+'px" class="imgRightDiv  imgRightDiv'+num2
				+'"><img class="rightImg  '+hasMsg+' rightImg'+num2+' " src="../image/treee_11.png"><p>����'+v.bname+'</p></div>');
				isLeftFlag=true;
				stepRightNum+=height/nums+parseInt(Math.random()*10) ;num2++;
			}

		}
		function showUserSpace(obj,qx,uid,username,did,name){
			openwin("../quan.html?userid="+uid+"&qx="+qx+"&title="+encodeURI(name));
		}
		//�Ƿ� ��˸
		 setInterval(function(){
			$(".shuandong").each(function(){

					var src=$(this).attr("src")+"";
					var color=$(this).attr("style")+"";
					var newsrc="";
					if(src.indexOf("treee0")!=-1)
						newsrc=src.replace("treee0","treee");
					else
						newsrc=src.replace("treee","treee0");
					if(color.indexOf("255")!=-1 )
						$(this).css("color","#000");
					else//color: rgb(255, 255, 255);
						$(this).css("color","#FFF");
					$(this).attr("src",newsrc);
			});
		},1000);
		function showFilerName(obj){
		
			$("h1").each(function(k,v){
				$(this).parent().parent().show();
				var text=""+$(this).text();
				if(text.indexOf(obj.value)!=-1){
					$(this).parent().parent().show();
				}else{
					$(this).parent().parent().hide();
				}
			});
		}
		function intoSpace(uid,qx,pname){
			 
			 if(qx>2){
				alertMsg("����鿴��/���ҵ�Ȩ�ޣ�",function(){
					 sendRegMsg("("+uid+")"," ��"+pname+"������������룬ϣ��ȥ��Ҳιۣ�");
			 });
			}else{
				alerts("������Ȩ�ޣ�");
			}
		}
		function intoZhu(uid,qx){
			if(qx!=2){
				alerts("����Ȩ�޷��ʣ�");
				return;
			}
			openwin("../index_2.html?userid="+uid+"&qx="+qx+"&pname="+encodeURI(pname));
		}
		function intoCi(uid,qx){
			if(qx!=2){
				alerts("����Ȩ�޷��ʣ�");
				return;
			}
			openwin("../index_1.html?userid="+uid+"&qx="+qx);
		}
		callBackUserInfo=function(user){
			var temp=$(".temps").html();
			var userids=getStorage("userid"); 
			 getNewData("HomeController_2_1",{newApi:true,param:"{'p1':'"+user.username+"'}"},function(data){
				 if(data.res==0){
					 var length= data.data.length;
					 var i=0;
					  $.each(data.data,function(k,v){
								if(i<10)
								addLeaf( length,v);
								$(".aui-expert-list").append(replaceJsonKeys(temp, v));
								i++;
					  });
					}
			 });

		}
		