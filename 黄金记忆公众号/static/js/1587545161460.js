
				//滑动 回调
				siliCallback=function(){
					reachLocation();
				}

			 //添加滑动
       addFindString();
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(v){
						 if(v.islt==2)
						 addSilide('施工完成','确认成功');
						 else{
							 addSilide('卸货完成','确认成功');
						 }
					 });
					 //appBackFlag=false;
			 }
			 function reachLocation(){
				if($("#xzwpic").val()==""){
					alerts("请拍照");
					return;
				}
				jsonPost("/carRabTranOrder.do",{status:5,id:MP.id,zhpic:$("#xzwpic").val(),xzwsj:new Date().getTime()},function(data){
					if(data.error==0){
							location.href="huo-detail9.html?id="+MP.id;
					}
			  });
 			}
			appBack=function(){
				//alertMsg("是否取消订单？",function(){
					//			myNoAcepase()
			  //});
			}
		