
		//���� �ص�
		siliCallback=function(){
			reachLocation();
		}
	//��ǰ��ʱʱ��
	var longTime=0;
	 //��ӻ���

			addFindString();
			addSilide('ǰ��ж����','�ɹ�ȷ��');
			var statusMy=3;
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
						 //�ϼƷ��ü���
						 //$(".heji").text('�ϼƣ�'+sumAllMoney(data));
						 var jdsj=parseInt(data.zhstime)+payCarTime*60*1000;
						 mysetInte=setInterval(function(){
								 var now=new Date().getTime();
								 //��ʱ�Ʒѹ���
								 var val=parseInt(apps().XHMFZJSJG.value);
								 //����
								 var max=parseInt(apps().XHMFZJSJG.max);
								 if(now-jdsj>0){
									 countTime(jdsj,now,function(dt){
										 $(".jl").html("װ����ʱ��ʱ��"+dt);
										});
								 }else{
									 countTime(now,jdsj,function(dt){
										 longTime=(now-jdsj)/1000/60;
											$(".jl").html("<p id='dataId' val='"+(now-jdsj)+"'>"+val+"Ԫ/"+max+"����</p>װ������ʱ��"+dt);
									 });

								 }

						 },1000);
					 });
					 appBackFlag=false;
			 }
			 function reachLocation(){
				//�������
				var money=0;
				//��ʱ�Ʒѹ���
				var val=parseInt(apps().XHMFZJSJG.value);
				//����
				var max=parseInt(apps().XHMFZJSJG.max);
				var tims = longTime/max;
				if(longTime%max>5){
					tims++;
				}
				money=val*tims;
				jsonPost("/carRabTranOrder.do",{zccsmoney:money,status:statusMy,id:MP.id,zhpic:$("#zhpic").val(),zhsj:new Date().getTime(),zhstime:new Date().gettime()},function(data){
 					if(data.error==0){
							if(statusMy==4){
								location.href="huo-detail7_1.html?id="+MP.id;
							}else{
								location.href="huo-detail5.html?id="+MP.id;
							  runMapNavi($("#fhry").val(),$("#fhrx").val(),$("#shry").val(),$("#shrx").val());
							}
					}
			  });
 			}
			appBack=function(){
				//alertMsg("�Ƿ�ȡ��������",function(){
					//			myNoAcepase()
			  //});
			}
		