
//初始语音
var bdTTS;
var setint=null;
var temp='<div class="aui-img-sml" > <img src="../image/timg.jpg" alt=""> </div> <div class="aui-flex-box"> <div class="aui-comm-button">'+
' <button onclick="openwin('dingdan.html')">抢单记录 <i class="icon icon-more"></i></button> </div>'+
' </div> <div class="aui-comm-button grabs rab{rabstatus}"> <button onclick="rabOrder(1)">立即接单 <i class="icon icon-more" >'+
'</i></button> </div> <div class="aui-comm-button grabs norab{rabstatus}"> <button onclick="rabOrder(0)">取消接单 <i class="icon icon-more" ></i></button> </div>';
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
//抢单{}
function grapOrder(url,id,obj){
	if(lvyj<=0){
		alerts("您未开通绿通，请开通后再试！");
		bdTTS.speak({
				text:"抢单失败，您未开通绿通服务，请上传购车发票，以及缴纳保证金！"
		},function(ret){
				//alert(JSON.stringify(ret));
				getUserInfos();
		});
		return;
	}
	var jdsj= parseInt(apps().JDLDDDZJZJD.value);
	var usercount= parseInt(userInfo.stuid);
	if(usercount>=jdsj){
		alerts('今日拒单数量已达上限！无法接单。 ');
		return;
	}
  // sM 9/98/9./ 9
	jsonPost("/carRabTranOrder.do",{cary:$("#cary").val(),carx:$("#carx").val(),carname:encodeURI($("#carname").val()),carsjh:$("#carsjh").val(),status:1,caruid:currentUserId,id:id,jdsj:new Date().getTime()},function(data){
			  if(data.error==0){
					bdTTS.speak({
							text:"抢单成功！！"
					},function(ret){
							//alert(JSON.stringify(ret));
					});
						 $(".orderList").html("");
					  openwin(url);
				}else{
					  $(obj).remove();
						bdTTS.speak({
								text:"未抢到订单！"
						},function(ret){
								//alert(JSON.stringify(ret));
						});
				}
	});

}
var otemp='<div class="aui-flex-item" onclick="grapOrder('huo-detail.html?id={id}',{id},this)"> <div class="aui-flex">'+
' <div class="aui-img-sml"> <img src="../image/order.png" alt=""> </div> <div class="aui-flex-box"> <h3>费用：￥{jcfy}'+
'<span style="color:red; font-size:12px">&nbsp;小费：{xfmoney}元</span></h3> <span>'+
' <em>距离发货地：{juli} KM</em> <em >付款方式：{payfs} </em></span> </div> <div class="aui-comm-button"> <button>抢单 <i class="icon icon-more"></i></button> </div> '+
'</div> <div class="aui-flex aui-flex-box" style="display:block;padding-top:0px">'+
' <h3 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span>发货地址：</span>{fhdz}</h3> '+
'<h3 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span>收货地址： </span>{shrdz}</h3> </div> <div class="b-line"></div> </div>';
var otemp1='<div class="aui-flex-item" onclick="grapOrder('huo-detail.html?id={id}',{id},this)"> <div class="aui-flex">'+
' <div class="aui-img-sml"> <img src="../image/order.png" alt=""> </div> <div class="aui-flex-box"> <h3>费用：￥{jcfy}'+
'<span style="color:red; font-size:12px">&nbsp;小费：{xfmoney}元</span></h3> <span>'+
' <em>距离发货地：{juli} KM</em> <em >工程车 </em></span> </div> <div class="aui-comm-button"> <button>抢单 <i class="icon icon-more"></i></button> </div> '+
'</div> <div class="aui-flex aui-flex-box" style="display:block;padding-top:0px">'+
' <h3 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"><span>施工地点：</span>{fhdz}</h3> '+
' </div> <div class="b-line"></div> </div>';
//读取抢单信息
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
						 var title="新订单："+v.fhdz+"到"+v.shrdz+"";
						 if(v.islt==2){
							 title="新订单：施工地点在"+v.fhdz;
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
//获取用户信息 完成后回调
//绿通是否开通
var lvyj=0;
var counts=0;
callBackUserInfo=function(user){
	if(counts!=0)return;
		var jdsj= parseInt(apps().JDLDDDZJZJD.value);
		$("#mrjdms").html('每日限取消'+jdsj+'单');
	counts++;
	//查看通知
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
	//更新位置
	$(function(){
			addUpdateLocation();
	});
	getNewData("TranOrderController_carid",{newApi:true,param:"{'p1':'"+user.id+"'}"},function(data){
			if(data.res==0){
				var v = data.data[0];
				if(v.status<6){
				var status=v.status;
				var string="未抢到";
				var str="待处理";
				var pic ="../image/error.png";
				var url="";
 						string="抢到";
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
			//初始化图片数据数据
	});
}

