
//��ʼ����
var bdTTS;
var setint=null;
var temp='<div class="aui-img-sml" > <img src="../image/timg.jpg" alt=""> </div> <div class="aui-flex-box"> <div class="aui-comm-button">'+
' <button onclick="openwin('dingdan.html')">������¼ <i class="icon icon-more"></i></button> </div>'+
' </div> <div class="aui-comm-button grabs rab{rabstatus}"> <button onclick="rabOrder(1)">�����ӵ� <i class="icon icon-more" >'+
'</i></button> </div> <div class="aui-comm-button grabs norab{rabstatus}"> <button onclick="rabOrder(0)">ȡ���ӵ� <i class="icon icon-more" ></i></button> </div>';
function rabOrder(status){
	jsonPost("/rabOrderStatus.do",{status:status},function(data){
				if(setint!=null){
					  if(status==0){
								clearInterval(setint);
						  	setint=null;
							}
				}else{
					setint=setInterval(function(){
								readRab();
					},3000);
				}
				$("#U_rabstatus").html(temp);
		     getUserInfos();
	});
}
//����{}
function grapOrder(url,id,obj){
	if(lvyj<=0){
		alerts("��δ��ͨ��ͨ���뿪ͨ�����ԣ�");
		bdTTS.speak({
				text:"����ʧ�ܣ���δ��ͨ��ͨ�������ϴ�������Ʊ���Լ����ɱ�֤��"
		},function(ret){
				//alert(JSON.stringify(ret));
				getUserInfos();
		});
		return;
	}
	var jdsj= parseInt(apps().JDLDDDZJZJD.value);
	var usercount= parseInt(userInfo.stuid);
	if(usercount>=jdsj){
		alerts('���վܵ������Ѵ����ޣ��޷��ӵ��� ');
		return;
	}
  // sM 9/98/9./ 9
	jsonPost("/carRabTranOrder.do",{cary:$("#cary").val(),carx:$("#carx").val(),carname:encodeURI($("#carname").val()),carsjh:$("#carsjh").val(),status:1,caruid:currentUserId,id:id,jdsj:new Date().getTime()},function(data){
			  if(data.error==0){
					bdTTS.speak({
							text:"�����ɹ�����"
					},function(ret){
							//alert(JSON.stringify(ret));
					});
						 $(".orderList").html("");
					  openwin(url);
				}else{
					  $(obj).remove();
						bdTTS.speak({
								text:"δ����������"
						},function(ret){
								//alert(JSON.stringify(ret));
						});
				}
	});

}
var otemp='<div class="aui-flex-item" onclick="grapOrder('huo-detail.html?id={id}',{id},this)"> <div class="aui-flex">'+
' <div class="aui-img-sml"> <img src="../image/order.png" alt=""> </div> <div class="aui-flex-box"> <h3>���ã���{jcfy}'+
'<span style="color:red; font-size:12px">&nbsp;С�ѣ�{xfmoney}Ԫ</span></h3> <span>'+
' <em>���뷢���أ�{juli} KM</em> <em >���ʽ��{payfs} </em></span> </div> <div class="aui-comm-button"> <button>���� <i class="icon icon-more"></i></button> </div> '+
'</div> <div class="aui-flex aui-flex-box" style="display:block;padding-top:0px">'+
' <h3 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span>������ַ��</span>{fhdz}</h3> '+
'<h3 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span>�ջ���ַ�� </span>{shrdz}</h3> </div> <div class="b-line"></div> </div>';
var otemp1='<div class="aui-flex-item" onclick="grapOrder('huo-detail.html?id={id}',{id},this)"> <div class="aui-flex">'+
' <div class="aui-img-sml"> <img src="../image/order.png" alt=""> </div> <div class="aui-flex-box"> <h3>���ã���{jcfy}'+
'<span style="color:red; font-size:12px">&nbsp;С�ѣ�{xfmoney}Ԫ</span></h3> <span>'+
' <em>���뷢���أ�{juli} KM</em> <em >���̳� </em></span> </div> <div class="aui-comm-button"> <button>���� <i class="icon icon-more"></i></button> </div> '+
'</div> <div class="aui-flex aui-flex-box" style="display:block;padding-top:0px">'+
' <h3 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span>ʩ���ص㣺</span>{fhdz}</h3> '+
' </div> <div class="b-line"></div> </div>';
//��ȡ������Ϣ
var oldData=[];
t.scroll_append_div=".orderList";
setInterval(function(){
	getSingleData("TranOrderController_12",getStorage("userid"),"U_",function(v){
		 if(v.rabstatus==0)
		 oldData=[];
	});

},50000);
function readRab(){
	 var i=0;
 	 getNewData("TranOrderController_21",{newApi:true,param:"{'p1':"+currentUserId+"}"},function(data){

			 $.each(data.data,function(k,v){
					if(oldData.indexOf(v.id)==-1){
						 if(i==0){
							 $(".orderList").html("");
							 i++;
						 }
						 oldData.push(v.id);
						 var title="�¶�����"+v.fhdz+"��"+v.shrdz+"";
						 if(v.islt==2){
							 title="�¶�����ʩ���ص���"+v.fhdz;
							 $(".orderList").append(replaceJsonKeys(otemp1,v));
						 }else{
							 $(".orderList").append(replaceJsonKeys(otemp,v));
						 }
						 bdTTS.speak({
								 text:title
						 },function(ret){
								 //alert(JSON.stringify(ret));
						 });

				 }
		 });
  	 },true);
}
$("#U_rabstatus").html(temp);
//��ȡ�û���Ϣ ��ɺ�ص�
//��ͨ�Ƿ�ͨ
var lvyj=0;
var counts=0;
callBackUserInfo=function(user){
	if(counts!=0)return;
		var jdsj= parseInt(apps().JDLDDDZJZJD.value);
		$("#mrjdms").html('ÿ����ȡ��'+jdsj+'��');
	counts++;
	//�鿴֪ͨ
	 setTimeout(function(){
		jsonPost("/carNoticMsg.do",{},function(data){
 				if(data.stime!="0"){
				//  clearInterval(readmsg);
				//	$(".orderList").html('<div class="aui-flex-item" style="padding:1rem" ><h1>'+data.title+'</h1> <p style="line-height:28px;border-top:1px solid #CCC">'+data.content+'</p> </div>');
		  	// setTimeout(function(){
				//			oldData=[];
				//	},15000);
				}
		},true);

	},5000);

	$(".aui-palace-two").show();
	lvyj=parseFloat(user.bzjmoney);
	if(setint==null&&$(".norab1").length>0){
		setint=setInterval(function(){
					readRab();
		},3000);
	}
	bdTTS = api.require('bdTTS');
	bdTTS.init({
	    mode:'MIX'
	},function(ret){
	});
	//����λ��
	$(function(){
			addUpdateLocation();
	});
	getNewData("TranOrderController_carid",{newApi:true,param:"{'p1':'"+user.id+"'}"},function(data){
			if(data.res==0){
				var v = data.data[0];
				if(v.status<6){
				var status=v.status;
				var string="δ����";
				var str="������";
				var pic ="../image/error.png";
				var url="";
 						string="����";
						pic ="../image/succes.png";
						if(status==1&&v.paystatus>=1){
							if(v.islt==2){
								url="huo-detail5.html?id="+v.id;
							}else {
								url="map.html?id="+v.id;
							}
					  }else if(status==2 ){
							if(v.zhsj!=0){
									url="huo-detail4.html?id="+v.id;
							}else
							if(v.islt==2){
								url="huo-detail5.html?id="+v.id;
							}else {
								url="map.html?id="+v.id;
							}
					  }else  if(status==1 ){
							 url="huo-detail.html?id="+v.id;
						}else   if(status==2){
							url="map.html?id="+v.id;
						}else   if(status==3){
							if(v.ddsj!=0){
								url="huo-detail7.html?id="+v.id;
							}else {
									if(v.payfs==1){
										url="huo-detail5.html?id="+v.id;
									}else {
										url="huo-detail5_1.html?id="+v.id;
									}

							}

						}else   if(status==4){
							if(v.islt==2){
								if(v.jgtype==1)
						   		  url="huo-detail7.html?id="+v.id;
									else {
											url="huo-detail7_1.html?id="+v.id;
									}
						 	}else{
									url="huo-detail7.html?id="+v.id;
							 }
						}else   if(status==5){
							url="huo-detail9.html?id="+v.id;
						}else   if(status==6){

						}
						if(url!="")
							openwin(url);
				}
			}
			//��ʼ��ͼƬ��������
	});
}

