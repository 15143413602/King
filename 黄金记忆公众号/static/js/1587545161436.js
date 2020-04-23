
		//滑动 回调
		siliCallback=function(){
			myAcepase();
		}
		addSilide('前往发货地/通知付款','成功确认');
		//当前超时时间
		var longTime=0;
			 addFindString();
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
						 if(data.isby==1){
							 $(".banyun").show();
						 }
						 if(data.islt!=2){
							 $(".gaosu").show();
						 }
					 });
					 appBackFlag=false;
			 }
			 var users=null;
			 callBackUserInfo=function(user){
				// MLog(apps().XHMFZJSJG);
				 users=user;
			 }
			 //接单
			 function myAcepase(){
				  if(users==null)return;
					var yjje=0;
					var islt=$(".O_islt").val();
					if(islt==1||islt.indexOf('绿通')!=-1){
						yjje=parseFloat(users.carmoney)*3;
					}
					var status=orderInfo.status;
					if(orderInfo.payfs==1)
					status=5;
				   //计算协商费用
				   var json = {yjje:yjje,paystatus:1,status:status,id:MP.id,jdsj:new Date().getTime()};

					 if($("#xsfy").val()!=""){ 
						 json.jcfy=$("#xsfy").val();
					 }
					 //搬运费用计算
					 if($("#banyun").val()!=""){
 						json.bymoney=$("#banyun").val();
 					}
					 //高速计算
					 if($("#gaosu").val()!=""){
						 json.gsmoney=$("#gaosu").val();
					 }
					 if($("#qita").val()!=""){
						 json.qtmoney=$("#qita").val();
					 }
				   jsonPost("/carRabTranOrder.do",json,function(data){
						 if(data.error==0){
							 if(orderInfo.payfs==1){
									 pushContent(MP.id, orderInfo.xuid,MP.id+"订单等待付款。",function(data){
										 location.href="huo-detail9.html?id="+MP.id;
									 });
		 						}else{
								  // runMapNavi(orderInfo.fhry ,orderInfo.fhrx ,0 ,orderInfo.waypoint);
								   pushContent(MP.id, orderInfo.xuid,MP.id+"订单等待付款。",function(data){
										 location.href="huo-detail5.html?id="+MP.id;
									 });
								 }
						 }else{
							  alerts(data.error_msg);
						 }
			    });
			 }

			appBack=function(){
			//	alertMsg("是否取消订单？",function(){
								myNoAcepase()
		//	 });
			}
		