
			 addFindString();
			 callBackInit = function(){
					 getSingleData("TranOrderController_1",MP.id,"O_",function(data){
						 if(data.isby==1){
							 $(".banyun").show();
						 }
						 if(data.islt!=2){
							 $(".gaosu").show();
						 }
					 });
					 appBackFlag=false;
			 }
			 var users=null;
			 callBackUserInfo=function(user){
				// MLog(apps().XHMFZJSJG);
				 users=user;
			 }
			 //�ӵ�
			 function myAcepase(){
				  if(users==null)return;
					var yjje=0;
					var islt=$(".O_islt").val();
					if(islt==1||islt.indexOf('��ͨ')!=-1){
						yjje=parseFloat(users.carmoney)*3;
					}
				   //����Э�̷���
				   var json = {yjje:yjje,paystatus:1,status:5,id:MP.id,jdsj:new Date().getTime()};

					 if($("#xsfy").val()!=""){
						 json.jcfy=$("#xsfy").val();
					 }
					 //���˷��ü���
					 if($("#banyun").val()!=""){
 						json.bymoney=$("#banyun").val();
 					}
					 //���ټ���
					 if($("#gaosu").val()!=""){
						 json.gsmoney=$("#gaosu").val();
					 }
				   jsonPost("/carRabTranOrder.do",json,function(data){
						 if(data.error==0){
							   runMapNavi(orderInfo.fhry ,orderInfo.fhrx ,0 ,orderInfo.waypoint);
							   pushContent(MP.id, orderInfo.xuid,MP.id+"�����ȴ����",function(data){
									 location.href="huo-detail5.html?id="+MP.id;
								 });
						 }else{
							  alerts(data.error_msg);
						 }
			    });
			 }

			appBack=function(){
			//	alertMsg("�Ƿ�ȡ��������",function(){
								myNoAcepase()
		//	 });
			}
		