 
			 //���� �ص�
			 siliCallback=function(){
				 reachLocation();
			 }

			//��ӻ���
			addSilide('ʩ����ɲ��տ�','��ʼ����');
			addFindString();
			//����ʱ����Ϣ�ͷ���
			 function reachLocation(){
				  clearJsq();
					var foot =parseFloat ($(".idFy").val());
					//��ʱ
					var time=secondToHour(parseInt(localStorage.getItem("times")));
					//����
					var moneys = foot;
					//��ʱ�Ʒ�
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
						  $(".jl").html("�����շѣ�"+data.jcfy);
						}else{
							//����ʱ
							changeJsq();
						}
						var jdsj=parseInt(data.ddsj)+downCarTime*60*1000;

					 });
					 //��ֹ����
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
					 	$(".jl").html("ʩ����ʱ��"+secondToDate(times*1000));
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

							$(".jl").html("ʩ����ʱ��"+secondToDate(time*1000));
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
			 //�û�����״̬
			 var paystatus=false;
			 //��ȡ�����Ƿ񸶿�

			 appBack=function(){
			 }
		