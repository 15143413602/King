
			 //���� �ص�
			 siliCallback=function(){
				 reachLocation();
			 }

		  	//��ӻ���

       addFindString();
			 function reachLocation(){
				  clearInterval(mysetInte);
					if(orderInfo.payfs==1){
								location.href="huo-detail5_1.html?id="+MP.id;
					}else{
						jsonPost("/carRabTranOrder.do",{status:5,id:MP.id ,xzwsj:new Date().getTime()},function(data){
							if(data.error==0){
									location.href="huo-detail9.html?id="+MP.id;
							}
					  });
					}


 			}
       var mysetInte;
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
						 if(data.islt==2){
					 	   addSilide('ʩ�����/�շ�','ȷ�ϳɹ�');
					  }
					  else{
					 	   addSilide('ж�����/�շ�','ȷ�ϳɹ�');
					  }
						var jdsj=parseInt(data.ddsj)+parseInt(apps().XZSJXSC.value)*60*1000;
						//&&data.payfs==1
						if(data.islt!=2){
						mysetInte=setInterval(function(){
								var now=new Date().getTime();
								if(now-jdsj>0){
									countTime(jdsj,now,function(dt){
										$(".jl").html("ж����ʱ��ʱ��"+dt);
										if(dt==""){
												 // clearInterval(mysetInte);
										 }
									 });
								}else{
									countTime(now,jdsj,function(dt){
										 $(".jl").html("ж������ʱ��"+dt);

										 if(dt==""){
													// clearInterval(mysetInte);
										 }
									});

								}

						},1000);
					}else{
						$(".ksxhl").hide();
					}
					 });
					 //��ֹ����
					 //appBackFlag=false;
					 //����ʱ
			 }
			 var mypayCheck;
			 //�û�����״̬
			 var paystatus=false;
			 //��ȡ�����Ƿ񸶿�

			 appBack=function(){
			 }
		