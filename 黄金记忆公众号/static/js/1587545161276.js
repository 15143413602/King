
		callBackUserInfo=function(user){
			 $(".xianjin").html(user.tcmoney+'Ԫ'+'��ȯ��'+user.gmoney+'Ԫ���������');
		};
		var allmoney=0;
		var orderData;
		callBackInit=function(){
			//����״̬����
				 //$(".pay").html('֧���˷ѣ�<span>��'+MP.money+'</span>&nbsp;&nbsp;֧����֤��<span>��'+MP.bzj+'</span>');

	}
		function paySuccess(){
			var val1= $("#shuidi").val();
			if(isNaN(val1)||val1==""||parseInt(val1)<=0){
				alerts("��������ȷ�Ľ�");
				return ;
			}
			allmoney=parseFloat(val1);
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
		 pay(parseFloat(allmoney),function(data){
		 jsonPost("/carOrderPay.do",{ paytype:val },function(data){
					 if(data.error==0){
					 alerts("����ɹ�");
					 setTimeout(function(){
						 winCloseFinish();
					 },1500)
					 }
				 });
			});

		}
				