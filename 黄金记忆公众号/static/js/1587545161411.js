
		//滑动 回调
		siliCallback=function(){
			reachLocation(true);
		}

	 //添加滑动
	  addSilide('完成装车进行拍照','成功确认');
		addFindString();
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_");
					 appBackFlag=false;
			 }
			 function reachLocation(){
 				 location.href="huo-detail4.html?id="+MP.id;
 			}
			appBack=function(){
				//alertMsg("是否取消订单？",function(){
					//			myNoAcepase()
			  //});
			}
		