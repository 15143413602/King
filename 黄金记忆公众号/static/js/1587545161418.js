
		//���� �ص�
		siliCallback=function(){
			reachLocation();
		}
		//��ǰ��ʱʱ��
		var longTime=0;
	 //��ӻ���

			addFindString();
			var statusMy=3;
			var orderData;
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
						orderData=data;
						 if(data.islt==2){
							 $(".am-header-title").text("����ʩ��������");
							 $(".pass").text('��ʩ���ؽ������գ�');
							   addSilide('��ʼʩ��','�ɹ�ȷ��');
								 statusMy=4;
						 }else{
							 $(".zcdjs").show();
							 //�ϼƷ��ü���&&data.payfs==1
				     if(data.islt!=2){
							 //$(".heji").text('�ϼƣ�'+sumAllMoney(data));
							 var jdsj=parseInt(data.zhsj)+parseInt(apps().CARZCDDSJ.value)*60*1000;
							 mysetInte=setInterval(function(){
									 var now=new Date().getTime();
									 //��ʱ�Ʒѹ���
									 var val=parseInt(apps().XHMFZJSJG.value);
									 //����
									 var max=parseInt(apps().XHMFZJSJG.max);
									 if(now-jdsj>0){
										 countTime(jdsj,now,function(dt){
											 longTime=(now-jdsj)/1000/60;
											 var tims =parseInt( longTime/max);
											 if(longTime%max>5){
												 tims++;
											 }
											 var money=val*tims;
											 $(".zcdjs").html("<p id='dataId' style='font-size:14px;color:red' val='"+(now-jdsj)+"'>��ʱ���ã�"+money+"Ԫ</p>װ���ѳ�ʱ��"+dt);
											});
									 }else{
										 countTime(now,jdsj,function(dt){

												$(".zcdjs").html("<p id='dataId' style='font-size:14px;color:red' val='"+(now-jdsj)+"'>��ʱ�Ʒѣ�"+val+"Ԫ/"+max+"����</p>װ������ʱ��"+dt);
										 });

									 }

							 },1000);
						 }else{
							 $(".zcdjs").hide();
						 }
							   addSilide('ǰ��ж����/�������','�ɹ�ȷ��');
						 }
					 });
					 appBackFlag=false;
			 }
			 function reachLocation(){
				if($("#zhpic").val()==""){
					alerts("������");
					return;
				}
				//�������
				var money=0;
				//��ʱ�Ʒѹ���
				var val=parseInt(apps().XHMFZJSJG.value);
				//����
				var max=parseInt(apps().XHMFZJSJG.max);
				 var tims =parseInt( longTime/max);
				if(longTime%max>5){
					tims++;
				}
				money=val*tims;
				var paystatus=1;
				if(orderData.paystatus==2)
					paystatus=2;
				jsonPost("/carRabTranOrder.do",{paystatus:paystatus,zhstime:new Date().getTime(),zccsmoney:money,status:statusMy,id:MP.id,zhpic:$("#zhpic").val(),zhsj:new Date().getTime()},function(data){
 					if(data.error==0){
							if(statusMy==4){
								location.href="huo-detail7_1.html?id="+MP.id;
							}else{
								if(orderInfo.payfs==1)
								{
									location.href="huo-detail5.html?id="+MP.id;
								}
								else {
									location.href="huo-detail5_1.html?id="+MP.id;
								}
							  //runMapNavi($("#fhry").val(),$("#fhrx").val(),$("#shry").val(),$("#shrx").val());
							}
					}
			  });
 			}
			appBack=function(){
				//alertMsg("�Ƿ�ȡ��������",function(){
					//			myNoAcepase()
			  //});
			}
		