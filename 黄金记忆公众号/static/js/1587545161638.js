
		callBackUserInfo=function(user){
			 $(".xianjin").html(user.tcmoney+'Ԫ'+'��ȯ��'+user.gmoney+'Ԫ���������');
		};
		var allmoney=0;
		var orderData;
		callBackInit=function(){
			//����״̬����
				 //$(".pay").html('֧���˷ѣ�<span>��'+MP.money+'</span>&nbsp;&nbsp;֧����֤��<span>��'+MP.bzj+'</span>');

				 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
				  //�ϼƷ��ü���
					orderData=data;
					 allmoney = parseFloat(sumAllMoney(data))+parseFloat(data.yjje);
				  $(".pay").html('<p>֧���˷ѣ�'+data.jcfy+'Ԫ</p>'+
					'<p>�����˷ѣ�'+data.bymoney+'Ԫ</p>'+
					'<p>װ����ʱ��'+data.zccsmoney+'Ԫ</p>'+
					'<p>�����˷ѣ�'+data.gsmoney+'Ԫ</p>'+
						'<p>����/ͣ���ѣ�'+data.qtmoney+'Ԫ</p>'+
						'<p>С�ѣ�'+data.xfmoney+'Ԫ</p>'+
					'<p>��֤��'+data.yjje+'Ԫ����ͨר��</p><br/>�ϼƷ��ã�'+allmoney );
				});
	}
		function paySuccess(){
			if(allmoney<=0){
				alerts('���Ժ󡤡�����');
				return;
			}
			//֧����ʽ
			var v=$("input[name='pay']");
			var val=0;
			v.each(function(){
				if($(this).is(":checked")){
				   val=($(this).val());
				}
			});
		  jsonPost("/appSumMoney.do",{money:allmoney},function(dts){
			  alerts(dts.error_msg);
			  if(dts.error==0){
				  layer.open({
					content: '֧����'+dts.money+"Ԫ������ֿ�"+dts.give+" Ԫ"
					,btn: ['����֧��', 'ȡ��']
					,skin: 'footer'
					,yes: function(index){
					  //��ʼ֧��
					   pay(parseFloat(dts.money),function(data){
						jsonPost("/carOrderPay.do",{status:orderData.status,jjje:dts.give,paystatus:2,id:MP.id,paytime:new Date().getTime(),paytype:val },function(data){
								  if(data.error==0){
									alerts("֧���ɹ�");
									setTimeout(function(){
										winCloseFinish();
									},1500)
								  }
							  });
						 });
					  layer.close(index);
					}
				  });

			  }
		  });

		}
				