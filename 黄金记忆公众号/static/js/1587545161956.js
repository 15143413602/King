
			 //滑动 回调
			 siliCallback=function(){
				 reachLocation();
			 }

			//添加滑动

			 addFindString();
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(v){
						 	if(v.islt==2){
								addSilide('对施工地点拍照','确认成功');
							}
							else{
								addSilide('开始卸货拍照','确认成功');
							}
						 if(v.payfs==0)
						 href="";
					 });
					 appBackFlag=false;
			 }
			 function reachLocation(){
				if($("#zhpic").val()==""){
					alerts("请拍照");
					return;
				}
				jsonPost("/carRabTranOrder.do",{status:4,id:MP.id,zhpic:$("#ddpic").val(),ddsj:new Date().getTime()},function(data){
					if(data.error==0){
							location.href="huo-detail7.html?id="+MP.id;
					}
			  });
 			}
			appBack=function(){
				//alertMsg("是否取消订单？",function(){
					//			myNoAcepase()
			  //});
			}
		