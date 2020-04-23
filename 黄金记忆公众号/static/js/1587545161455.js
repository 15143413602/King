 
			 //滑动 回调
			 siliCallback=function(){
				 reachLocation();
			 }

			//添加滑动
			addSilide('施工完成并收款','开始导航');
			addFindString();
			//保存时间信息和费用
			 function reachLocation(){
				  clearJsq();
					var foot =parseFloat ($(".idFy").val());
					//用时
					var time=secondToHour(parseInt(localStorage.getItem("times")));
					//费用
					var moneys = foot;
					//按时计费
					if(jgtype==0)
						moneys=foot*time;
 					jsonPost("/carRabTranOrder.do",{status:5,id:MP.id,kgtime:time,xzwsj:localStorage.getItem("nowtime"),jcfy:moneys},function(data){
						if(data.error==0){
									location.href="huo-detail9.html?id="+MP.id;
						}
				  });
 			}
       var mysetInte;
			 var jgtype=0;
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
						 jgtype=data.jgtype;
						$(".idFy").val(data.jcfy);
						if(jgtype==1){
							$(".footer2").hide();
						  $(".jl").html("按工收费："+data.jcfy);
						}else{
							//倒计时
							changeJsq();
						}
						var jdsj=parseInt(data.ddsj)+downCarTime*60*1000;

					 });
					 //禁止返回
					 appBackFlag=false;

			 }
			 function changeJsq(){
				 var times=localStorage.getItem("start");
					 if(typeof(times)!="undefined"&&!isNaN(times)&&times==1){
						  startJsq();
							$(".jixdahang2").show();
					 }else {
					 		//clearJsq();
							$(".jixdahang1").show();
					 }
					 	 var times=localStorage.getItem("times");
					 	$(".jl").html("施工计时："+secondToDate(times*1000));
			 }
			 function startJsq(){
				 $(".jixdahang2").show();
				 $(".jixdahang1").hide();
				 var times=localStorage.getItem("times");
 					if(typeof(times)=="undefined"||isNaN(times)){
						localStorage.setItem("nowtime",new Date().getTime());
						localStorage.setItem("times",0);
 					}
					localStorage.removeItem("start");
					localStorage.setItem("start",1);
					mysetInte=setInterval(function(){
							var now=new Date().getTime();
							var time=parseInt(localStorage.getItem("times"));
							var mtime=parseInt(localStorage.getItem("nowtime"));

					  	localStorage.removeItem("times");
							time++;
 							localStorage.setItem("times",time);

							$(".jl").html("施工计时："+secondToDate(time*1000));
					},1000);
			 }
			 function clearJsq(){
				 $(".jixdahang1").show();
				 $(".jixdahang2").hide();
				 clearInterval(mysetInte);
				 localStorage.removeItem("start");
 				 localStorage.setItem("start",0);
			 }
			 var mypayCheck;
			 //用户付款状态
			 var paystatus=false;
			 //读取订单是否付款

			 appBack=function(){
			 }
		