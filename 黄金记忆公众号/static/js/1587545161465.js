
			//���� �ص�
			siliCallback=function(){
				reachLocation();
			}

			 //��ӻ���
			 addSilide('ȷ���շ�','ȷ�ϳɹ�');
			 addFindString();
			 var allmoney=0;
			 var paystatus=0;
			 var string='<span>��ֹ����ʱ:</span> {xs} ������: {xschs} ��δ����: {xswchs} <br/><span>ж�����ʱ��:</span> {xz} ����: {xzchs} δ����: {xzwchs}  <br/><span>��ֹ�㳬ʱ:</span>'+
			 ' {xsmoney}  Ԫ <br/><span>ж����ʱ:</span> {xzmoney} Ԫ'+
			 ' </br><span>�˷�:</span> {jcfy} Ԫ <br/><h2><span>��:</span> {allmoney} Ԫ</h2>';

 			 callBackInit = function(){
				   getSingleData("TranOrderController_1",MP.id,"O_",function(data1){
								if(data1.islt==2){
									allmoney=data1.jcfy;
									paystatus=data1.paystatus;
										$(".infor").html('<span>��ʱ:</span> '+secondToHour(parseInt(data1.xzxs))+'Сʱ'+
						 			 ' </br><span>����:</span> '+data1.jcfy+' Ԫ <br/><h2><span>��:</span> '+data1.jcfy+' Ԫ</h2>');
								}else if(data1.islt==1){
									jsonPost("/moneyArithTranOrder.do",{orderId:MP.id},function(data){
											///	MLog(data);
			 						 			allmoney=data.allmoney;
			 						 			paystatus=data.paystatus;
												string='<span>��ֹ����ʱ:</span> '+getTimes(data.xs)+'  ������: '+getTimes(data.xschs)+' ��δ����: '+getTimes(data.xswchs)+' <br/><span>ж�����ʱ��:</span> '+getTimes(data.xz)+
												' ����:'+getTimes(data.xzchs)+' δ����: '+getTimes(data.xzwchs)+'  <br/><span>��ֹ�㳬ʱ:</span>'+
								 			 ' '+data.xsmoney+'   Ԫ <br/><span>ж����ʱ:</span> '+data.xzmoney+' Ԫ'+'<p>֧���˷ѣ�'+data.jcfy+'Ԫ</p>'+
											 '<p>�����˷ѣ�'+data1.bymoney+'Ԫ</p>'+
											 '<p>װ����ʱ��'+data1.zccsmoney+'Ԫ</p>'+
											 '<p>�����˷ѣ�'+data1.gsmoney+'Ԫ</p>'+
								 			 ' <h2><span>��:</span> '+data.allmoney+' Ԫ</h2>';

												$(".infor").html(string);
			 					 });
							 }else{

								 //allmoney=data.jcfy;
								 paystatus=data.paystatus;
								 if(paystatus==0||paystatus==1){
									 pushContent(MP.id, data.xuid,"�����ȴ���֧������",function(data){
										 //location.href="huo-detail2.html?id="+MP.id;
									 });
								 }
								 allmoney = parseFloat(sumAllMoney(data))+parseFloat(data.yjje);
							   $(".infor").html('<p>֧���˷ѣ�'+data.jcfy+'Ԫ</p>'+
								 '<p>�����˷ѣ�'+data.bymoney+'Ԫ</p>'+
								 '<p>װ����ʱ��'+data.zccsmoney+'Ԫ</p>'+
								 '<p>�����˷ѣ�'+data.gsmoney+'Ԫ</p>'+
								 '<p>С�ѣ�'+data.xfmoney+'Ԫ</p>'+
								 '<p>ͣ��/������'+data.qtmoney+'Ԫ</p>'+
								 ' <h2><span>��:</span> '+allmoney+' Ԫ</h2>' );

							 }

					 });
			 }
			 function reachLocation(){
						location.href="huo-detail10.html?id="+MP.id+"&money="+allmoney+"&paystatus="+paystatus;
 			 }
			appBack=function(){
				//alertMsg("�Ƿ�ȡ��������",function(){
					//			myNoAcepase()
			  //});
			}
		